import React, { ReactNode } from "react";
/**
 * P -- props
 * S -- state
 * children  --
 * fallbackRender -- 当异常发生的时侯，显示一个出错页面
 *
 * {children: ReactNode; fallbackRender: FallbackRender }
 * ===
 * React.PropsWithChildren<{ fallbackRender: FallbackRender }>  -- > 意思为除了children 其他都用传入
 * */
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// https://github.com/bvaughn/react-error-boundary
// 一个比较好的错误处理的插件

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };
  // 当子组件抛出异常，这里会接收到并且调用
  // 这个静态方法是官方提供的
  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
