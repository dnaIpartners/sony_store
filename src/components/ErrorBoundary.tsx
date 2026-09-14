'use client';
import React from 'react';

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null; attempt: number }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, attempt: 0 };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] text-[#111] gap-4">
          <h1 className="text-2xl font-bold">페이지를 불러오는 중 오류가 발생했습니다.</h1>
          <p className="text-sm text-gray-600">{this.state.error?.message}</p>
          <button
            className="px-4 py-2 bg-black text-white rounded"
            // attempt 를 올려 자식을 다시 마운트한다. 상태만 되돌리면 같은 트리가
            // 같은 오류를 즉시 다시 던져 버튼이 아무 일도 하지 않는다
            onClick={() => this.setState((s) => ({ hasError: false, error: null, attempt: s.attempt + 1 }))}
          >
            다시 시도
          </button>
        </div>
      );
    }
    return <React.Fragment key={this.state.attempt}>{this.props.children}</React.Fragment>;
  }
}
