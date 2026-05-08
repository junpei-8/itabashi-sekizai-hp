import { useEffect, useState, type ComponentProps, type ReactNode } from "react"
import { Menu, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { href: "#greeting", label: "ごあいさつ" },
  { href: "#consult", label: "ご相談" },
  { href: "#services", label: "業務案内" },
  { href: "#gravestones", label: "墓石の種類" },
  { href: "#faq", label: "よくある質問" },
  { href: "#company", label: "会社案内" },
  { href: "#contact", label: "お問い合わせ" },
]

function scrollToSection(href: string) {
  const target = href === "#top" ? document.documentElement : document.getElementById(href.slice(1))

  if (!target) return

  target.scrollIntoView({ behavior: "smooth", block: "start" })

  const nextUrl = href === "#top" ? `${location.pathname}${location.search}` : `${location.pathname}${location.search}${href}`
  const updateHistory = location.hash ? history.replaceState : history.pushState
  updateHistory.call(history, null, "", nextUrl)
}

function AnchorButton({ href, children, className, variant = "ghost" }: {
  href: string
  children: ReactNode
  className?: string
  variant?: ComponentProps<typeof Button>["variant"]
}) {
  return (
    <Button asChild variant={variant} className={className}>
      <a
        href={href}
        onClick={(event) => {
          if (!href.startsWith("#")) return
          event.preventDefault()
          scrollToSection(href)
        }}
      >
        {children}
      </a>
    </Button>
  )
}

export default function HeaderClient() {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1))
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)[0]

        setActiveId(activeEntry?.target.id ?? null)
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-background">
      <div className="container mx-auto flex min-h-20 items-center justify-between gap-6 px-4 py-3">
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-3"
          aria-label="有限会社板橋石材 ホームへ"
          onClick={(event) => {
            event.preventDefault()
            scrollToSection("#top")
          }}
        >
          <img src="/logo.svg" alt="" className="size-11 shrink-0 rounded-sm" width="44" height="44" decoding="async" />
          <span className="whitespace-nowrap">
            <span className="block font-serif-jp text-lg font-semibold tracking-[0.16em] text-foreground">有限会社板橋石材</span>
            <span className="block text-base tracking-[0.14em] text-muted-foreground">宮城県大崎市鹿島台</span>
          </span>
        </a>

        <nav className="hidden items-center gap-2 xl:flex" aria-label="主要ナビゲーション">
          {navItems.map((item) => {
            const id = item.href.slice(1)
            const isActive = activeId === id

            return (
              <AnchorButton
                key={item.href}
                href={item.href}
                className={cn(
                  "h-10 px-4 text-base font-extrabold hover:bg-muted",
                  isActive ? "text-primary hover:text-primary" : "text-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </AnchorButton>
            )
          })}
        </nav>

        <Button asChild variant="ghost" className="hidden h-11 gap-2 px-5 text-base font-bold tracking-wide xl:inline-flex">
          <a href="tel:0229-25-8445"><Phone className="size-4" aria-hidden="true" />0229-25-8445</a>
        </Button>

        <div className="flex items-center gap-2 xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" aria-label="メニューを開く">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent>
            <SheetHeader>
              <SheetTitle>有限会社板橋石材</SheetTitle>
              <SheetDescription>宮城県大崎市鹿島台</SheetDescription>
            </SheetHeader>
            <nav className="grid gap-2" aria-label="スマートフォン用ナビゲーション">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <AnchorButton href={item.href} className="w-full justify-start rounded-xl px-4 py-3 text-base font-semibold text-foreground hover:bg-muted hover:text-foreground">
                    {item.label}
                  </AnchorButton>
                </SheetClose>
              ))}
            </nav>
            <Button asChild variant="outline" className="mt-auto w-full gap-2 rounded-xl py-3 text-base font-bold">
              <a href="tel:0229-25-8445"><Phone className="size-4" aria-hidden="true" />0229-25-8445</a>
            </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
