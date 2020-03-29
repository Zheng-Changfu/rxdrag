import {Node} from "../node"
import {TextNode} from "./text-node"

export class RXNode extends Node{
  constructor() {
    super()

  }


  clone(){
    let copy = super.clone()
    copy.meta = JSON.parse(JSON.stringify(this.meta))
    copy.defaultMeta = JSON.parse(JSON.stringify(this.defaultMeta))
    copy.label = this.label

    return copy
  }

  setLabel(label){
    this.label = label
    this.labelToCapitalize()
    return this
  }

  labelToCapitalize(){
    let label = this.label
    this.label = label.replace(label[0], label[0].toUpperCase())
  }


  toViewModel(){
    let model = super.toViewModel()
    this.baseMetaToModel(model)

    if((rxEditor.state.showMarginX && this.rule.editMarginStyle)
      || this.children.length === 0
      ){
      model.styles['padding-left'] = this.rule.editMarginStyle.paddingX
      model.styles['padding-right'] = this.rule.editMarginStyle.paddingX
    }
    if((rxEditor.state.showMarginY && this.rule.editMarginStyle)
      || this.children.length === 0
      ){
      model.styles['padding-top'] = this.rule.editMarginStyle.paddingY
      model.styles['padding-bottom'] = this.rule.editMarginStyle.paddingY
    }

    //添加for后，编辑时无法选中
    if(model.attributes.for){
      model.attributes.for = ''
    }

    if(this.meta.innerHTML){
      model.innerHTML = this.meta.innerHTML
    }

    return model
  }

  toPreviewModel(){
    let model = super.toPreviewModel()
    this.baseMetaToModel(model)
    return model
  }

  baseMetaToModel(model){
    let meta = this.meta
    model.tag = meta.tag
    model.innerHTML = meta.innerHTML
    model.classList.push.apply(model.classList, meta.classList)
    Object.assign(model.styles, meta.styles)
    Object.assign(model.attributes, meta.attributes)
  }

  setTag(tag){
    return this.setField('tag', tag)
  }

  addClass(className){
    if(!className){
      return this
    }
    this.meta.classList.push(className)
    return this
  }

  setAttribute(attrName, value){
    this.meta.attributes[attrName] = value
    return this
  }

  changeTextnodeToCharNode(){
    let children = []
    this.children.forEach(child=>{
      if(child.isTextNode){
        children.push.apply(children, child.charNodes())
        this.isCharState = true
      }
      else{
        children.push(child)
      }
    })

    this.children = children
    this.render()
  }

  changeCharNodeToTextNode(){
    let children = []
    var textNode = null
    this.children.forEach(child=>{
      if(child.isCharNode){
        let prev = child.previousSbiling()
        if(!prev || !prev.isCharNode){
          textNode = new TextNode('')
          textNode.parent = this
          children.push(textNode)
        }

        textNode.text += child.char
      }
      else{
        children.push(child)
      }
    })    
    this.children = children
    this.render()
    this.isCharState = false
  }

  clearCharNodes(){
    if(this.isCharState){
      this.changeCharNodeToTextNode()
    }
    super.clearCharNodes()
  }

}