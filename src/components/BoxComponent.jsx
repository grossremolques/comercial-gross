export function BoxComponent({ title, children,  size = 'md' }) {
  return (
    <div className={`max-w-${size === 'md' ? '[1200px]': 'full'} mx-auto px-6 py-30`} title={title}>
      {children}
    </div>
  );
}
export function BoxComponentScrolling({ title, children,  size = 'md', height = 'calc(100vh - 12rem)', className }) {
  return (
    <div className={`max-w-${size === 'md' ? '[1200px]': 'full'} mx-auto overflow-y-auto ${className}`} title={title} style={{ height: height }}>
      {children}
    </div>
  )}