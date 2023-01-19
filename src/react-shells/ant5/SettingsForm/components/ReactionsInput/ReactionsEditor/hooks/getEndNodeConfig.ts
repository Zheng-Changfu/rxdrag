import { GlobalToken } from "antd/es/theme/interface"
import { IReactionNodeMeta } from "runner/reaction/interfaces/metas"

const STROKE_WIDTH = 5
export const getEndNodeConfig = (nodeMeta: IReactionNodeMeta, token: GlobalToken) => {
  return {
    shape: 'circle',
    x: 700,
    y: 200,
    width: 20,
    height: 20,
    ...nodeMeta.x6Node,
    id: nodeMeta.uuid,
    label: nodeMeta.label,
    attrs: {
      body: {
        fill: token.colorBgBase,
        stroke: token.colorText,
        strokeWidth: 0,//STROKE_WIDTH,
      },
      label: {
        refX: '100%',
        refX2: 10,
        refY: 0.5,
        textAnchor: 'start',
        textVerticalAnchor: 'middle',
        fill: token.colorTextSecondary,
      },
    },
    ports: {
      groups: {
        out: {
          attrs: {
            circle: {
              r: 10,
              magnet: true,
              fill: token.colorBgBase,
              stroke: token.colorText,
              strokeWidth: STROKE_WIDTH,
            },
          },
        },
      },
      items: [
        {
          id: nodeMeta.uuid + '-port',
          group: 'out',
          args: {
            dx: 10,
          }
        },
      ],
    }
  }
}