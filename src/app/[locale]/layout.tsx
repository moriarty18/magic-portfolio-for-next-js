import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
import classNames from 'classnames';
import Script from 'next/script';
import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, effects, style } from '@/app/resources'
import { Inter, Source_Code_Pro } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { routing } from "@/i18n/routing";
import { renderContent } from "@/app/resources";
import { Background, Flex } from "@/once-ui/components";

// Определяем шрифты
const primary = Inter({ 
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-primary',
});

const code = Source_Code_Pro({ 
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-code',
});

// Определяем тип для props
interface RootLayoutProps {
   children: React.ReactNode;
   params: {
       locale: string;
   };
}

export default async function RootLayout({
   children,
   params: {locale}
} : RootLayoutProps) {
   unstable_setRequestLocale(locale);
   const messages = await getMessages();
   return (
       <NextIntlClientProvider messages={messages}>
           <Flex
               as="html" 
               lang="en"
               background="page"
               data-neutral={style.neutral} 
               data-brand={style.brand} 
               data-accent={style.accent}
               data-solid={style.solid} 
               data-solid-style={style.solidStyle}
               data-theme={style.theme}
               data-border={style.border}
               data-surface={style.surface}
               data-transition={style.transition}
               className={classNames(
                   primary.className,
                   code.className
               )}>
               <Script
                   async
                   src="https://www.googletagmanager.com/gtag/js?id=AW-16874881298"
                   strategy="afterInteractive"
               />
               <Script id="google-analytics" strategy="afterInteractive">
                   {`
                       window.dataLayer = window.dataLayer || [];
                       function gtag(){dataLayer.push(arguments);}
                       gtag('js', new Date());
                       gtag('config', 'AW-16874881298');
                   `}
               </Script>
               <Flex 
                   style={{minHeight: '100vh'}}
                   as="body"
                   fillWidth 
                   margin="0" 
                   padding="0"
                   direction="column">
                   <Background
                       mask={effects.mask as any}
                       gradient={effects.gradient as any}
                       dots={effects.dots as any}
                       lines={effects.lines as any}
                   />
                   <Flex
                       fillWidth
                       minHeight="16">
                   </Flex>
                   <Header/>
                   <Flex
                       zIndex={0}
                       fillWidth 
                       paddingY="l" 
                       paddingX="l"
                       justifyContent="center" 
                       flex={1}>
                       <Flex
                           justifyContent="center"
                           fillWidth 
                           minHeight="0">
                           <RouteGuard>
                               {children}
                           </RouteGuard>
                       </Flex>
                   </Flex>
                   <Footer/>
               </Flex>
           </Flex>
       </NextIntlClientProvider>
   );
}