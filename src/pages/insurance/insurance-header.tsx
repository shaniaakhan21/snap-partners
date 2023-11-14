export default function InsuranceHeader () {
  return (
    <header className="bg-blackCustom">
      <nav className="mx-auto flex max-w-[90%] items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-2">
          <a href="/snap-health-insurance" className="-m-1.5 p-1.5">
            <img className="h-12 lg:h-16 xl:h-20 w-auto" src='/static/snap_partners_logo.png' alt="Snap Partners Logo" />
          </a>
        </div>
      </nav>
    </header>
  )
}
