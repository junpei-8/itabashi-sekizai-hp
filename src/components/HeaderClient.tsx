import { useEffect, useState, type ComponentProps, type ReactNode } from "react"
import { Menu, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { href: "#top", label: "概要", sectionIds: ["top", "consult"] },
  { href: "#services", label: "業務案内", sectionIds: ["services", "gravestones", "products"] },
  { href: "#faq", label: "よくある質問", sectionIds: ["faq"] },
  { href: "#company", label: "会社案内", sectionIds: ["company"] },
  { href: "#access", label: "アクセス", sectionIds: ["access", "contact"] },
]

const mobileNavItems = [
  { href: "#top", label: "トップ" },
  { href: "#consult", label: "ご相談内容" },
  { href: "#services", label: "業務案内" },
  { href: "#gravestones", label: "墓石の種類" },
  { href: "#products", label: "取扱品" },
  { href: "#faq", label: "よくある質問" },
  { href: "#company", label: "会社案内" },
  { href: "#access", label: "アクセス" },
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
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const updateActiveId = () => {
      const nextIsAtTop = window.scrollY < 8
      setIsAtTop(nextIsAtTop)

      if (nextIsAtTop) {
        setActiveId(null)
        return
      }

      const marker = window.scrollY + window.innerHeight * 0.35
      const sections = navItems.flatMap((item) =>
        item.sectionIds.map((sectionId) => ({
          navId: item.href.slice(1),
          element: document.getElementById(sectionId),
        })),
      )

      const current = sections
        .filter((section): section is { navId: string; element: HTMLElement } => Boolean(section.element))
        .filter(({ element }) => element.offsetTop <= marker)
        .at(-1)

      setActiveId(current?.navId ?? navItems[0]?.href.slice(1) ?? null)
    }

    updateActiveId()
    window.addEventListener("scroll", updateActiveId, { passive: true })
    window.addEventListener("resize", updateActiveId)

    return () => {
      window.removeEventListener("scroll", updateActiveId)
      window.removeEventListener("resize", updateActiveId)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b-2 transition-colors duration-200",
        isAtTop ? "border-transparent bg-transparent text-background" : "border-border bg-background text-foreground",
      )}
    >
      <div className="container mx-auto flex min-h-(--site-header-height) items-center justify-between gap-5 px-4 py-1.5 lg:py-2">
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="有限会社板橋石材 ホームへ"
          onClick={(event) => {
            event.preventDefault()
            scrollToSection("#top")
          }}
        >
          <img src="/logo.svg" alt="" className="size-8 shrink-0 rounded-sm lg:size-9" width="36" height="36" decoding="async" />
          <span className={cn("whitespace-nowrap font-serif-jp text-sm font-semibold tracking-[0.12em] lg:text-base", isAtTop ? "text-background" : "text-foreground")}>有限会社板橋石材</span>
        </a>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="主要ナビゲーション">
          {navItems.map((item) => {
            const id = item.href.slice(1)
            const isActive = activeId === id

            return (
              <AnchorButton
                key={item.href}
                href={item.href}
                className={cn(
                  "h-8 px-3 text-sm font-extrabold",
                  isAtTop ? "hover:bg-background/10 hover:text-background" : "hover:bg-muted",
                  isActive
                    ? isAtTop
                      ? "text-background underline underline-offset-4"
                      : "text-primary hover:text-primary"
                    : isAtTop
                      ? "text-background"
                      : "text-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </AnchorButton>
            )
          })}
        </nav>

        <Button
          asChild
          variant="ghost"
          className={cn(
            "hidden h-8 gap-2 px-4 text-sm font-bold tracking-wide lg:inline-flex",
            isAtTop ? "text-background hover:bg-background/10 hover:text-background" : "text-foreground hover:text-foreground",
          )}
        >
          <a href="tel:0229-25-8445"><Phone className="size-4" aria-hidden="true" />0229-25-8445</a>
        </Button>

        <div className="flex items-center gap-2 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" aria-label="メニューを開く" className={cn(isAtTop && "text-background hover:bg-background/10 hover:text-background")}>
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent>
            <SheetHeader>
              <SheetTitle>有限会社板橋石材</SheetTitle>
            </SheetHeader>
            <nav className="grid gap-2" aria-label="スマートフォン用ナビゲーション">
              {mobileNavItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <AnchorButton href={item.href} className="w-full justify-start rounded-xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted hover:text-foreground">
                    {item.label}
                  </AnchorButton>
                </SheetClose>
              ))}
            </nav>
            <Button asChild variant="outline" className="mt-auto w-full gap-2 rounded-xl py-3 text-sm font-bold">
              <a href="tel:0229-25-8445"><Phone className="size-4" aria-hidden="true" />0229-25-8445</a>
            </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
