const Card = ({ children, className, style, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={
        'bg-dark-300 px-8 pb-8 rounded-2xl border-light-700 border-1 ' +
        className
      }
      style={{
        boxShadow:
          '0px 0px 0.788321px rgba(12, 26, 75, 0.24), 0px 2.36496px 6.30657px -0.788321px rgba(50, 50, 71, 0.05)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Card
