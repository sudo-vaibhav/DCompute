const Loading = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 16 16"
      fill="none"
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style></style>
      <path
        opacity=".5"
        d="M8 15A7 7 0 108 1a7 7 0 000 14v0z"
        stroke="#DBAB0A"
        stroke-width="2"
      />
      <path d="M15 8a7 7 0 01-7 7" stroke="#DBAB0A" stroke-width="2" />
      <path d="M8 12a4 4 0 100-8 4 4 0 000 8z" fill="#DBAB0A" />
    </svg>
  )
}

export default Loading
