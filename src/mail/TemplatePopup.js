//@flow
import m from "mithril"
import type {ModalComponent} from "../gui/base/Modal"
import {modal} from "../gui/base/Modal"
import {px} from "../gui/size"
import type {Shortcut} from "../misc/KeyManager"
import type {PosRect} from "../gui/base/Dropdown"
import {TextFieldN} from "../gui/base/TextFieldN"
import type {TextFieldAttrs} from "../gui/base/TextFieldN"
import stream from "mithril/stream/stream.js"
import {Keys} from "../api/common/TutanotaConstants"
import {TemplatePopupResultRow} from "./TemplatePopupResultRow"
import {searchForTag, searchInContent} from "./TemplateSearchFilter.js"
import type {Template} from "../settings/TemplateListView"
import {loadTemplates} from "../settings/TemplateListView"
import {Icons} from "../gui/base/icons/Icons"
import {Icon} from "../gui/base/Icon"
import type {ButtonAttrs} from "../gui/base/ButtonN"
import {ButtonN, ButtonType} from "../gui/base/ButtonN"
import {TemplateExpander} from "./TemplateExpander"
import {theme} from "../gui/theme"


export class TemplatePopup implements ModalComponent {
	_rect: PosRect
	_filterTextAttrs: TextFieldAttrs
	_shortcuts: Shortcut[]
	_scrollDom: HTMLElement

	_allTemplates: Array<Template>
	_searchResults: Array<Template>

	_onSubmit: (string) => void

	_selected: boolean
	_cursorHover: boolean
	_expanded: boolean
	_height: string
	_currentIndex: number = 0

	_selectedLanguage: Stream<string>
	_availableLanguages: Array<Object>

	_fieldDom: HTMLElement
	_dropdownDom: HTMLElement

	constructor(rect: PosRect, onSubmit: (string) => void, highlightedText: string) {
		this._height = "270px"
		this._allTemplates = loadTemplates()
		this._selectedLanguage = stream(this._allTemplates.length ? Object.keys(this._allTemplates[0].content)[0] : "")
		this._searchResults = this._allTemplates
		this._setProperties()
		this._rect = rect
		this._onSubmit = onSubmit
		this._filterTextAttrs = {
			label: () => "Filter... (# to search for Tag)",
			value: stream(highlightedText),
			focusOnCreate: true,
			oninput: (input) => { /* Filter function */
				this._currentIndex = 0
				if (input === "") {
					this._searchResults = this._allTemplates
				} else if (input.charAt(0) === "#") { // search ID
					this._searchResults = searchForTag(input, this._allTemplates)
				} else { // search title / content
					this._searchResults = searchInContent(input, this._allTemplates)
				}
				this._setSelectedLanguage()
				this._setProperties()
			},
			oncreate: () => {
				if (highlightedText === "") {
					console.log("text empty")
				} else if (highlightedText.charAt(0) === "#") {
					this._searchResults = searchForTag(highlightedText, this._allTemplates)
				} else {
					this._searchResults = searchInContent(highlightedText, this._allTemplates)
				}
				this._setSelectedLanguage()
				this._setProperties()
			},
			onInputCreate: (vnode) => {
				this._fieldDom = vnode.dom
			}
		}
		this._shortcuts = [
			{
				key: Keys.ESC,
				enabled: () => true,
				exec: () => {
					this._onSubmit("")
					this._close()
					m.redraw()
				},
				help: "closeTemplate_action"
			},
			{
				key: Keys.RETURN,
				enabled: () => true,
				exec: () => {
					this._getSelectedTemplate() ? this._onSubmit((this._getSelectedTemplate()).content[this._selectedLanguage()]) : null
					this._close()
					m.redraw()
				},
				help: "insertTemplate_action"
			},
		]
	}

	view: () => Children = () => {
		return m(".flex.abs.elevated-bg.plr.border-radius.dropdown-shadow", { // Main Wrapper
				style: {
					width: "750px",
					margin: "1px",
					top: px(this._rect.top),
					left: px(this._rect.left),
					flexDirection: "row",
					height: this._height + "px",
					cursor: this._cursorHover ? "pointer" : "default",
				},
				onclick: (e) => {
					e.stopPropagation()
				},
			}, [
				m(".flex.flex-column", {style: {height: "340px", width: "375px"}}, [ // left
					m(".flex", { // Header Wrapper
						style: {
							flexDirection: "row",
							height: "70px",
							marginBottom: "-20px",
							width: "375px"
						},
						onkeydown: (e) => { /* simulate scroll with arrow keys */
							if (e.keyCode === 40) { // DOWN
								this._changeSelectionViaKeyboard("next")
							} else if (e.keyCode === 38) { // UP
								e.preventDefault()
								this._changeSelectionViaKeyboard("previous")
							} else if (e.keyCode === 9) { // TAB
								e.preventDefault()
								this._dropdownDom.focus()
							}
						},
					}, [
						m("", { // left Textfield
								style: {
									marginTop: "-12px",
									flex: "1 0 auto",
								},
							}, m(TextFieldN, this._filterTextAttrs)
						), // Filter Text
					]), // Header Wrapper END
					m(".flex.flex-column.scroll", { // left list
							style: {
								height: this._height,
								overflowY: "show",
								marginBottom: "3px",
								width: "375px"
							},
							oncreate: (vnode) => {
								this._scrollDom = vnode.dom
							},
						}, this._containsResult() ?
						this._searchResults.map((template, index) => this._renderTemplateList(template, index))
						: m(".row-selected", {style: {marginTop: "10px", textAlign: "center"}}, "Nothing found")
					), // left end
				]),
				[
					this._containsResult() ? this._renderTemplateExpander(this._getSelectedTemplate()) : null
				],
			],
		)
	}

	_renderTemplateExpander(template: Template): Children {
		return m("", {
			style: {
				height: "340px",
				marginLeft: "7px"
			}
		}, [
			m(TemplateExpander, {
				template,
				language: this._selectedLanguage(),
				onDropdownCreate: (vnode) => {
					this._dropdownDom = vnode.dom
				},
				onLanguageSelected: (lang) => {
					this._selectedLanguage(lang)
				},
				onReturnFocus: () => {
					this._fieldDom.focus()
				}
			}),
			m(".flex", {
				style: {
					width: "340px",
					marginLeft: "auto",
					marginRight: "5px",
					justifyContent: "right"
				}
			}, [
				m(ButtonN, {
					label: () => "Submit",
					click: (e) => {
						this._onSubmit(template.content[this._selectedLanguage()])
						this._close()
						e.stopPropagation()
					},
					type: ButtonType.Primary,
				}),
			])

		])
	}

	_renderTemplateList(template: Template, index: number): Children {
		// this._selected = index === this._currentIndex
		// const submitButtonAttrs: ButtonAttrs = {
		// 	label: () => "Submit",
		// 	click: (e) => {
		// 		this._onSubmit(template.content[this._selectedLanguage()])
		// 		this._close()
		// 		e.stopPropagation()
		// 	},
		// 	type: ButtonType.Primary,
		// 	title: () => "Submit"
		// }
		return m(".flex.flex-column", {
				style: {
					backgroundColor: (index % 2) ? theme.list_bg : theme.list_alternate_bg
				}
			}, [
				m(".flex", {
						onclick: (e) => {
							this._currentIndex = index // navigation via mouseclick
							this._fieldDom.focus()
							this._selectedLanguage = stream(this._searchResults.length ? Object.keys(this._searchResults[this._currentIndex].content)[0] : "")
							e.stopPropagation()

						},
						ondblclick: (e) => {
							this._onSubmit(this._searchResults[index].content[this._selectedLanguage()])
							this._close()
							e.stopPropagation()
						},
						onmouseover: () => {
							this._cursorHover = true
						},
						onmouseleave: () => this._cursorHover = false,
						class: this._isSelected(index) ? "row-selected" : "", /* show row as selected when using arrow keys */
						style: {
							borderLeft: this._isSelected(index) ? "4px solid" : "4px solid transparent"
						}
					}, [
						m(TemplatePopupResultRow, {template}),
						// this._selected ? m("", m(ButtonN, submitButtonAttrs)) : null,
						this._isSelected(index) ? m(Icon, {
							icon: Icons.ArrowForward,
							style: {marginTop: "auto", marginBottom: "auto"}
						}) : m("", {style: {width: "17.1px", height: "16px"}}),
					]
				)
			]
		)
	}

	_isSelected(index: number): boolean {
		return (index === this._currentIndex)
	}

	_getSelectedTemplate(): Template {
		return this._searchResults[this._currentIndex]
	}

	_containsResult(): boolean {
		return this._searchResults.length > 0
	}

	_setSelectedLanguage() {
		this._selectedLanguage = stream(this._searchResults.length ? Object.keys(this._searchResults[this._currentIndex].content)[0] : "")
	}

	_setProperties() { /* improvement to dynamically calculate height with certain amount of templates and reset selection to first template */

		/*
			Currently disabled. Remove fixed height from div for height to be calculated individually!
		 */

		if (this._searchResults.length < 7 && this._searchResults.length !== 0) {
			this._height = (this._searchResults.length * 47.7167) + 10 + "px"
		} else if (this._searchResults.length === 0) {
			this._height = "40px"
		} else {
			this._height = "285px"
		}
		this._currentIndex = 0
	}

	_changeSelectionViaKeyboard(action: string) { /* count up or down in templates */
		if (action === "next" && this._currentIndex <= this._searchResults.length - 2) {
			this._currentIndex++
			this._scrollDom.scroll({
				top: (47.7167 * this._currentIndex),
				left: 0,
				behavior: 'smooth'
			})
		} else if (action === "previous" && this._currentIndex > 0) {
			this._currentIndex--
			this._scrollDom.scroll({
				top: (47.7167 * this._currentIndex),
				left: 0,
				behavior: 'smooth'
			})
		}
		this._setSelectedLanguage()
	}

	show() {
		modal.display(this, false)
	}

	_close(): void {
		modal.remove(this)
	}

	backgroundClick(e: MouseEvent): void {
		this._close()
		console.log(e.target)
	}

	hideAnimation(): Promise<void> {
		return Promise.resolve()
	}

	onClose(): void {
	}

	shortcuts(): Shortcut[] {
		return this._shortcuts
	}

	popState(e: Event): boolean {
		return true
	}
}