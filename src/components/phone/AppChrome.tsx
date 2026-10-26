// iOS status bar and the consumer app's top bar, shared by the showroom
// screen mocks inside the phone frames.

export function StatusBar() {
  return (
    <div className="flex h-[54px] flex-none items-center justify-between pr-7 pl-[34px] text-[16px] font-semibold">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg
          width="18"
          height="12"
          viewBox="0 0 17 11"
          fill="#0F0F0F"
          aria-hidden="true"
        >
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 11"
          fill="none"
          stroke="#0F0F0F"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M1 3.6a10 10 0 0 1 14 0" />
          <path d="M3.6 6.4a6.3 6.3 0 0 1 8.8 0" />
          <circle cx="8" cy="9.4" r="1.1" fill="#0F0F0F" stroke="none" />
        </svg>
        <svg
          width="26"
          height="12"
          viewBox="0 0 25 12"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x=".5"
            y=".5"
            width="21"
            height="11"
            rx="3.2"
            stroke="#B0B0B0"
          />
          <rect x="2" y="2" width="16" height="8" rx="2" fill="#0F0F0F" />
          <path d="M23 4.2v3.6a2 2 0 0 0 0-3.6z" fill="#B0B0B0" />
        </svg>
      </div>
    </div>
  )
}

export function AppBar({ title }: { title?: string }) {
  return (
    <div className="flex h-[46px] flex-none items-center gap-1.5 border-b-[0.5px] border-[#EFEFEF] pr-4 pl-1">
      <div className="flex p-2.5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F0F0F"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </div>
      {title ? (
        <span className="min-w-0 flex-1 text-[16px] font-semibold tracking-[-0.3px]">
          {title}
        </span>
      ) : (
        <span className="flex-1" />
      )}
      <div className="flex items-center gap-[18px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F0F0F"
          strokeWidth="2"
          strokeLinecap="square"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.6-3.6" />
        </svg>
        <div className="relative flex">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0F0F0F"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M4.4 7.5h15.2l-1.1 12.3H5.5z" />
            <path d="M8.8 10V6.6a3.2 3.2 0 0 1 6.4 0V10" />
          </svg>
          <span className="absolute -top-[5px] -right-[7px] box-border flex h-[18px] min-w-[18px] items-center justify-center rounded-[100px] border-[1.5px] border-white bg-accent text-[10px] text-white">
            2
          </span>
        </div>
      </div>
    </div>
  )
}

const HEART_PATH =
  "M12 20.6c-.35 0-.7-.12-.96-.37C7.4 16.9 3.6 13.5 3.6 9.9c0-2.7 2.1-4.8 4.7-4.8 1.4 0 2.7.6 3.7 1.7 1-1.1 2.3-1.7 3.7-1.7 2.6 0 4.7 2.1 4.7 4.8 0 3.6-3.8 7-7.44 10.33-.26.25-.61.37-.96.37z"

export function HeartIcon({ filled = false }: { filled?: boolean }) {
  const color = filled ? "#F2456E" : "#0F0F0F"
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke={color}
      fill={filled ? color : "none"}
      strokeWidth="1.7"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={HEART_PATH} />
    </svg>
  )
}

export function PostAuthor({
  avatar,
  name,
  time,
  className = "",
  more = false,
}: {
  avatar: string
  name: string
  time: string
  className?: string
  more?: boolean
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={avatar}
        alt=""
        className="h-9 w-9 flex-none rounded-full object-cover"
      />
      <span className="text-[13.5px] font-semibold">{name}</span>
      <span className={`text-[13px] text-[#8E8E8E] ${more ? "flex-1" : ""}`}>
        · {time}
      </span>
      {more && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#0F0F0F"
          aria-hidden="true"
        >
          <circle cx="5.5" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="18.5" cy="12" r="1.6" />
        </svg>
      )}
    </div>
  )
}
