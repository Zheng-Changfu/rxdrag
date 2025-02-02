export type FieldType = 'object' | 'array' | 'normal';

export enum PatternType {
  //可编辑
  editable = 'editable',
  //禁用
  disabled = 'disabled',
  //只读
  readOnly = 'readOnly',
  //阅读模式，比如把input转成text，需要组件支持
  readPretty = 'readPretty'
}

export enum DisplayType {
  //代表字段 UI 隐藏，同时不保留字段数据
  none = "none",
  //代表字段 UI 隐藏，保留字段数据
  hidden = "hidden",
  //代表字段 UI 显示，同时恢复字段数据
  visible = "visible"
}

//表达式代码，格式：{{...}}
export type Expression = string;

export interface IFieldReactionMeta {
  //值
  value?: {
    value?: unknown,
    expression?: string,
  } | Expression,
  //字段显示类型
  display?: {
    value?: DisplayType,
    expression?: string,
  } | Expression,
  //交互模式
  pattern?: {
    value?: PatternType,
    expression?: string,
  } | Expression,
  //可见
  // visible?: {
  //   value?: boolean,
  //   expression?: Expression,
  // },
  //隐藏
  hidden?: {
    value?: boolean,
    expression?: string,
  } | Expression,
  //禁用
  disabled?: {
    value?: boolean,
    expression?: string,
  } | Expression,
  //只读
  readonly?: {
    value?: boolean,
    expression?: string,
  } | Expression,
  [key: string]: {
    value?: unknown,
    expression?: string,
  } | Expression | undefined,
}

//表单元数据
// export type IFormMeta = {
//   reactionMeta?: IFieldReactionMeta
// }

export interface IValidateSchema {
  //boolean，为了简化其它地方解析，required目前不携带message
  required?: boolean
}

//字段元数据
export interface IFieldMeta<ValidateRules extends IValidateSchema = IValidateSchema> {
  //类型：对象、数组、常规
  type?: FieldType;
  name?: string;
  label?: string;
  defaultValue?: unknown;
  //校验规则
  validateRules?: ValidateRules;
  //联动配置
  reactionMeta?: IFieldReactionMeta;
  //下拉列表类组件的数据源
  //dataSource?: unknown | Expression;
}
