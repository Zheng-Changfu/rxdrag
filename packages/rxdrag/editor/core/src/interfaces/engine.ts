import { IRxDragLocalesManager } from "@rxdrag/locales"
import { INodeSchema } from "@rxdrag/schema"
import { IDocument, NodeBehavior } from "./document"
import { IDesignerShell } from "./shell"
import { IMonitor } from "./monitor"
import { IResourceManager } from "./resource"
import { ID } from "./types"
import { IAction, IActions } from "./action"
import { IComponentConfig, IComponentManager } from "./component"
import { IPlugin, IPluginFactory } from "./plugin"
import { IDecoratorManager } from "./decorator"
import { ISetterManager } from "./setter"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IDesignerEngine<ComponentType = any, IconType = any> {
	getLanguage(): string
	setLanguage(lang: string): void
	setSelectionMode(mode: SelectionMode): void
	createDocument(schema: INodeSchema): IDocument,
	getDocument(id: ID): IDocument | null,
	getNodeDocument(nodeId: ID): IDocument | null,
	getAllDocuments(): IDocument[] | null

	getMonitor(): IMonitor
	getShell(): IDesignerShell
	getComponentManager(): IComponentManager<ComponentType>
	getResourceManager(): IResourceManager<IconType>
	getSetterManager(): ISetterManager<ComponentType>
	getLocalesManager(): IRxDragLocalesManager
	getDecoratorManager(): IDecoratorManager
	getActions(): IActions

	registerPlugin(pluginFactory: IPluginFactory): void
	getPlugin(name: string): IPlugin | null

	dispatch(action: IAction<unknown>): void
	destroy(): void

	getNodeBehavior(nodeId: ID): NodeBehavior

	registerMaterials(materials: IComponentConfig<ComponentType, IconType>[]): void,
}
