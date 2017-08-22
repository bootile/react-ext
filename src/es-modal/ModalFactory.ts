import * as React from "react"
import { autobind } from "core-decorators"
import { ModalProps } from "antd/lib/modal/Modal.d"

import { ICommonModalProps, ModalStore } from "./ModalStore"
import { ConfirmModal, IConfirmModalInput } from "./Confirm"
import { AlertModal, IAlertModalInput, AlertType } from "./Alert"

@autobind
export class ModalFactory {
  static create<IResult, IInput>(
    store: ModalStore,
    modalProps: ModalProps,
    Component: React.ComponentClass<ICommonModalProps<IResult, IInput>>,
    data?: IInput
  ): Promise<IResult> {
    return store.add(modalProps, Component, data)
  }

  static confirm(
    store: ModalStore,
    data: IConfirmModalInput,
    modalProps?: ModalProps
  ) {
    modalProps = {
      ...modalProps,
      width: 416
    }
    return store.add<{}, IConfirmModalInput>(modalProps, ConfirmModal, data)
  }

  static alert(
    store: ModalStore,
    type: AlertType,
    data: IAlertModalInput,
    modalProps?: ModalProps
  ) {
    modalProps = {
      ...modalProps,
      width: 416
    }
    return store.add<{}, IAlertModalInput>(modalProps, AlertModal, {
      ...data,
      type
    })
  }

  static info(
    store: ModalStore,
    data: IAlertModalInput,
    modalProps?: ModalProps
  ) {
    ModalFactory.alert(store, "info", data, modalProps)
  }

  static success(
    store: ModalStore,
    data: IAlertModalInput,
    modalProps?: ModalProps
  ) {
    ModalFactory.alert(store, "success", data, modalProps)
  }

  static error(
    store: ModalStore,
    data: IAlertModalInput,
    modalProps?: ModalProps
  ) {
    ModalFactory.alert(store, "error", data, modalProps)
  }

  static warning(
    store: ModalStore,
    data: IAlertModalInput,
    modalProps?: ModalProps
  ) {
    ModalFactory.alert(store, "warning", data, modalProps)
  }
}
