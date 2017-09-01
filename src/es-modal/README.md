# 封装的模态框

1. 在全局根组件下添加 ModalContainer 组件实例，注意：全局只能出现一次
```html
<Provider {...stores}>
  <LocaleProvider locale={antd}>
    <IntlProvider locale={locale} messages={messages}>
      <div>
        {renderRouter(routes)}
        <ModalContainer />
      </div>
    </IntlProvider>
  </LocaleProvider>
</Provider>
```

2. 编写具体模态框内部内容组件，例如
```typescript
import * as React from "react"
import { ICommonModalProps, CommonModalFooter  } from "es-base/src/es-modal"

@observer
@autobind
export class EditUserModal extends React.Component<
  ICommonModalProps<IUser, IUser>,
  {}
> {
  @observable isSubmitting = false

  onOk() {
    ...
  }

  render() {
    return (
      <main>
        <UserForm ref="form" data={this.props.data} />
        <CommonModalFooter onCancel={this.props.reject} onOk={this.onOk} />
      </main>
    )
  }
}
```

3. 在使用的地方
```typescript
import { ModalService } from "es-base/src/es-modal"

...
    ModalService.create<IUser, IUser>(
      { title },
      EditUserModal
    ).then(onOk, onCancel)
...

```