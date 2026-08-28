import { motion } from "framer-motion";
import { useEffect } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContactForm } from "@workspace/api-client-react";
import { Link } from "wouter";
import {
  CATALOG_INQUIRY_EVENT,
  consumePendingInquiry,
  type CatalogInquiryDetail,
} from "@/lib/catalog-inquiry";
import { legalPath } from "@/data/legal";
import { WAREHOUSES, warehouseMapUrl } from "@/data/site";

const formSchema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  company: z.string().optional(),
  contact: z.string().min(5, "Введите телефон или email"),
  topic: z.string().min(1, "Выберите тему"),
  message: z.string().min(10, "Опишите ваш запрос (минимум 10 символов)"),
});

type FormValues = z.infer<typeof formSchema>;

export function Contacts() {
  const { toast } = useToast();
  const { mutateAsync, isPending } = useSubmitContactForm();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "Материалы"
    }
  });

  useEffect(() => {
    const prefill = (detail: CatalogInquiryDetail) => {
      setValue("topic", detail.topic, { shouldValidate: true });
      setValue("message", detail.message, { shouldValidate: true });

      window.setTimeout(() => {
        document.getElementById("contact-message")?.focus();
      }, 500);
    };

    const onCatalogInquiry = (event: Event) => {
      prefill((event as CustomEvent<CatalogInquiryDetail>).detail);
    };

    window.addEventListener(CATALOG_INQUIRY_EVENT, onCatalogInquiry);

    const pending = consumePendingInquiry();
    if (pending) prefill(pending);

    return () => {
      window.removeEventListener(CATALOG_INQUIRY_EVENT, onCatalogInquiry);
    };
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      await mutateAsync({ data });
      toast({
        title: "Заявка отправлена",
        description: "Наш менеджер свяжется с вами в ближайшее время.",
      });
      reset();
    } catch {
      toast({
        title: "Не удалось отправить заявку",
        description: "Попробуйте позже или свяжитесь с нами по телефону или email.",
      });
    }
  };

  return (
    <section id="contacts" className="py-24 bg-card/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Свяжитесь с нами</h2>
          <div className="w-20 h-1 bg-primary mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary"><Phone size={24} /></div>
                  Отдел продаж
                </h3>
                <div className="space-y-2 ml-16">
                  <a href="tel:+78123052516" className="block text-2xl font-display hover:text-primary transition-colors">8 (812) 305-25-16</a>
                  <a href="tel:+79602441144" className="block text-2xl font-display hover:text-primary transition-colors">8 (960) 244-11-44</a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary"><Mail size={24} /></div>
                  Email
                </h3>
                <div className="ml-16">
                  <a href="mailto:sale@tarpstandart.ru" className="text-xl text-muted-foreground hover:text-primary transition-colors">sale@tarpstandart.ru</a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary"><MapPin size={24} /></div>
                  Склады
                </h3>
                <p className="ml-16 text-sm text-muted-foreground mb-5">
                  Адреса для водителей. Перед выездом согласуйте отгрузку с отделом продаж.
                </p>
                <ul className="ml-16 space-y-6">
                  {WAREHOUSES.map((warehouse) => (
                    <li key={warehouse.city}>
                      <p className="font-semibold text-foreground mb-1">{warehouse.city}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                        {warehouse.address}
                      </p>
                      <a
                        href={warehouseMapUrl(warehouse)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm text-primary hover:underline underline-offset-2"
                      >
                        Открыть в Яндекс Картах
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-border">
                <details className="group cursor-pointer">
                  <summary className="text-sm text-muted-foreground font-medium uppercase tracking-wider outline-none select-none hover:text-foreground transition-colors">
                    Реквизиты компании
                  </summary>
                  <div className="mt-4 text-sm text-muted-foreground/80 leading-relaxed bg-background p-4 rounded-xl border border-border space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-2">ООО «ТарпСтандарт»</p>
                      ИНН: 7814190674<br />
                      ОГРН: 1157847088607<br />
                      Юр. адрес: 197374, г. Санкт-Петербург, ул. Стародеревенская, д.11, корп. 2, лит. А
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2">Банк-плательщик</p>
                      Санкт-Петербургский филиал ПАО «БАНК УРАЛСИБ»<br />
                      ИНН банка: 0274062111<br />
                      р/с: 40702810722220000923 (RUR)<br />
                      к/с: 30101810800000000706<br />
                      БИК: 044030706<br />
                      ОКПО: 39503912
                    </div>
                    <div>
                      Генеральный директор — Нарышкин Олег Сергеевич<br />
                      <span className="text-muted-foreground">(на основании Устава)</span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="font-medium text-foreground mb-2">TarpStandard LTD.</p>
                      197374, ul. Staroderevenskaya, 11, korp. 2, lit. А, rooms 282, 292, St. Petersburg, Russia<br />
                      Primary State Registration Number (OGRN): 1157847088607<br />
                      Taxpayer Identification Number (INN): 7814190674<br />
                      Tax Registration Reason Code (KPP): 781401001
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2">Bank details</p>
                      Bank Name: VTB Bank (PJSC) (TSENTRALNYI BRANCH, MOSCOW)<br />
                      Bank address: 107031 MOSCOW KUZNETSKIY MOST 17/1<br />
                      Swift Code: VTBRRUM2MS2<br />
                      Beneficiary&apos;s Acc. № 40702156926620000062
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              
              <h3 className="text-2xl font-bold mb-8 relative z-10">Оставить заявку</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Имя *</label>
                    <Input {...register("name")} className="bg-background border-border focus-visible:ring-primary h-12" placeholder="Иван Иванов" />
                    {errors.name && <span className="text-destructive text-xs mt-1 block">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Компания</label>
                    <Input {...register("company")} className="bg-background border-border focus-visible:ring-primary h-12" placeholder="ООО Производство" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Телефон или Email *</label>
                  <Input {...register("contact")} className="bg-background border-border focus-visible:ring-primary h-12" placeholder="+7 (999) 000-00-00 или email@example.com" />
                  {errors.contact && <span className="text-destructive text-xs mt-1 block">{errors.contact.message}</span>}
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Тема запроса *</label>
                  <select 
                    {...register("topic")} 
                    className="flex h-12 w-full rounded-md border border-border bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="Материалы">Материалы ПВХ / ТПУ</option>
                    <option value="Оборудование">Оборудование</option>
                    <option value="Образцы">Запрос образцов</option>
                    <option value="Прочее">Прочее</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Сообщение *</label>
                  <Textarea 
                    id="contact-message"
                    {...register("message")} 
                    className="bg-background border-border focus-visible:ring-primary min-h-[150px] resize-y" 
                    placeholder="Здравствуйте, интересует ткань ПВХ плотностью 650 г/м2..."
                  />
                  {errors.message && <span className="text-destructive text-xs mt-1 block">{errors.message.message}</span>}
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-base font-semibold group"
                  disabled={isPending}
                >
                  {isPending ? "Отправка..." : "Отправить заявку"}
                  {!isPending && <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь на{" "}
                  <Link
                    href={legalPath("sbor-dannyh")}
                    className="underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    обработку персональных данных
                  </Link>
                  {" "}и подтверждаете ознакомление с{" "}
                  <Link
                    href={legalPath("politika-konfidencialnosti")}
                    className="underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    политикой конфиденциальности
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
