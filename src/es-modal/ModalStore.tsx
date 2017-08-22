import * as React from "react"
import { observable, action } from "mobx"
// import { ModalProps } from "antd/lib/modal/Modal.d"
interface IModalProps {
  visible?: boolean
  confirmLoading?: boolean
  title?: React.ReactNode | string
  closable?: boolean
  onOk?: (e: React.MouseEvent<any>) => void
  onCancel?: (e: React.MouseEvent<any>) => void
  afterClose?: () => void
  width?: string | number
  footer?: React.ReactNode
  okText?: string
  cancelText?: string
  maskClosable?: boolean
  style?: React.CSSProperties
  wrapClassName?: string
  maskTransitionName?: string
  transitionName?: string
  className?: string
  getContainer?: (instance: React.ReactInstance) => HTMLElement
}

let ID = 0
function generateId() {
  return `MODAL#${ID++}`
}

export interface ICommonModalProps<IResult, IInput> {
  resolve: (result: IResult) => void
  reject: () => void
  data?: IInput
}

export interface IModal<IResult, IInput> {
  id: string
  modalProps: IModalProps
  Component: React.ComponentClass<ICommonModalProps<IResult, IInput>>
  props: ICommonModalProps<IResult, IInput>
  data: IInput
}

export class ModalStore {
  @observable modals: Array<IModal<any, any>> = []

  @action
  add<IResult, IInput>(
    modalProps: IModalProps,
    Component: React.ComponentClass<ICommonModalProps<IResult, IInput>>,
    data: IInput
  ): Promise<IResult> {
    return new Promise<IResult>((res, rej) => {
      const doResolve = (result: IResult) => {
        res(result)
        this.remove(id)
      }
      const doReject = () => {
        rej()
        this.remove(id)
      }

      const defaultProps = observable({
        visible: true,
        closable: false,
        confirmLoading: false,
        footer: null,
        ...modalProps
      }) as IModalProps

      const id = generateId()
      this.modals.push({
        id,
        Component,
        modalProps: defaultProps,
        data,
        props: {
          data,
          resolve: doResolve,
          reject: doReject
        }
      })
    })
  }

  @action
  remove(id: string) {
    const index = this.modals.findIndex(item => item.id === id)
    if (index === -1) {
      return
    }
    this.modals.splice(index, 1)
  }
}
