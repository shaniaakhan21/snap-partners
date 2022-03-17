type IOptions = {
  root?: HTMLElement
  rootMargin?: string
  threshold?: number
}

export const createObserver = (
  element: HTMLElement,
  handleIntersect: (entries, observer) => void,
  options: IOptions = { rootMargin: '100px' }
) => {
  const observer = new IntersectionObserver(handleIntersect, options)

  element && observer.observe(element)

  return () => observer && observer.disconnect()
}
