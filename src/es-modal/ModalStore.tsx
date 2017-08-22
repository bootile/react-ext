import * as React from "react"
import { observable, action } from "mobx"
import { ModalProps } from "antd/lib/modal/Modal.d"

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
  modalProps: ModalProps
  Component: React.ComponentClass<ICommonModalProps<IResult, IInput>>
  props: ICommonModalProps<IResult, IInput>
  data: IInput
}

export class ModalStore {
  @observable modals: Array<IModal<any, any>> = []

  @action
  add<IResult, IInput>(
    modalProps: ModalProps,
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
      }) as ModalProps

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
