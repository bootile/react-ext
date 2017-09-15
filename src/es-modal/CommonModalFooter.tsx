import * as React from "react"
import styled from "styled-components"
import { Row, Col, Button } from "antd"

export interface ICommonModalFooterProps {
  hideOk?: boolean
  hideCancel?: boolean

  onOk?: () => void
  onCancel?: () => void
  okText?: JSX.Element | string
  cancelText?: JSX.Element | string
}

export const CommonModalFooter = (props: ICommonModalFooterProps) => {
  const okText = props.okText || "确定"
  const cancelText = props.cancelText || "取消"

  return (
    <Wrapper>
      <Row type="flex" justify="end" gutter={10}>
        {!props.hideCancel && (
          <Col>
            <Button size="large" onClick={props.onCancel}>
              {cancelText}
            </Button>
          </Col>
        )}
        {!props.hideOk && (
          <Col>
            <Button size="large" type="primary" onClick={props.onOk}>
              {okText}
            </Button>
          </Col>
        )}
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  margin: 0 -16px -16px;
  padding: 10px 16px;
  border-top: 1px solid #e9e9e9;
`
