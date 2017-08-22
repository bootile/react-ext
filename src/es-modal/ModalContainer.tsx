import * as React from "react"
import { observer } from "mobx-react"
import { autobind } from "core-decorators"
import { Modal } from "antd"
import { ModalStore } from "./ModalStore"

@observer
@autobind
export class ModalContainer extends React.Component<{ store: ModalStore }, {}> {
  render() {
    return (
      <div>
        {this.props.store.modals.map(item =>
          <Modal key={item.id} {...item.modalProps}>
            <item.Component {...item.props} />
          </Modal>
        )}
      </div>
    )
  }
}
