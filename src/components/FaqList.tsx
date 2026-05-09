import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type Faq = {
  question: string
  answer: string
}

type FaqListProps = {
  faqs: Faq[]
}

export function FaqList({ faqs }: FaqListProps) {
  return (
    <Accordion type="single" collapsible className="grid gap-3">
      {faqs.map((faq, index) => (
        <Card key={faq.question} className="overflow-hidden rounded-3xl bg-card/70 p-0 py-0 shadow-sm shadow-foreground/5">
          <AccordionItem value={`item-${index}`} className="border-b-0">
            <AccordionTrigger className="items-center gap-4 rounded-b-none px-5 py-4 font-serif-jp text-lg font-semibold leading-8 tracking-[0.08em] text-foreground no-underline hover:bg-primary/10 hover:no-underline data-[state=open]:bg-primary/10 data-[state=open]:hover:bg-primary/20 **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:self-center **:data-[slot=accordion-trigger-icon]:text-primary md:px-6 md:py-5 md:text-xl md:**:data-[slot=accordion-trigger-icon]:size-7">{faq.question}</AccordionTrigger>
            <AccordionContent className="border-t border-border px-5 pb-5 pt-3 text-base leading-8 text-muted-foreground md:px-6 md:pb-5 md:text-lg">{faq.answer}</AccordionContent>
          </AccordionItem>
        </Card>
      ))}
    </Accordion>
  )
}
