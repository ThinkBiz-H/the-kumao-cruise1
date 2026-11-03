import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import Button from '../ui/Button';
import { navLinks, site } from '../../data/siteContent';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrolled } from '../../hooks/useScrolled';
import { EASE } from '../../utils/motion';
import { cn } from '../../utils/cn';

const SECTION_IDS = navLinks.map((link) => link.id);

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(12);
  const active = useActiveSection(SECTION_IDS);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && close();
    const onResize = () => window.innerWidth >= 880 && close();
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-line pt-[env(safe-area-inset-top)] backdrop-blur-md transition-shadow duration-300',
        'bg-cream/92',
        scrolled && 'shadow-header',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-xs focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1160px] items-center justify-between px-5 py-4 sm:px-7 md:py-[18px]"
      >
        <a href="#top" className="flex flex-col leading-none" aria-label={`${site.name} — back to top`} onClick={close}>
          <span className="font-display text-[1.3rem] font-semibold text-ink">{site.name}</span>
          <span className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-ink-soft">{site.tagline}</span>
        </a>

        <div className="hidden items-center gap-[30px] md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.id} link={link} active={active === link.id} />
          ))}
          <Button href="#contact" size="sm">
            Enquire
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-xs text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiXMark className="size-7" aria-hidden="true" /> : <HiBars3 className="size-7" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="absolute inset-x-0 top-full overflow-hidden border-b border-line bg-cream shadow-header md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul className="m-0 flex list-none flex-col gap-1 px-5 pt-3 pb-6 sm:px-7">
              {navLinks.map((link, i) => (
                <m.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3, ease: EASE }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={close}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={cn(
                      'block border-b border-line py-3 text-[1.05rem]',
                      active === link.id ? 'text-accent' : 'text-ink',
                    )}
                  >
                    {link.label}
                  </a>
                </m.li>
              ))}
              <li className="pt-4">
                <Button href="#contact" onClick={close} className="w-full">
                  Enquire
                </Button>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ link, active }) {
  return (
    <a
      href={`#${link.id}`}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'relative py-1 text-[0.92rem] transition-colors duration-200 hover:text-accent',
        'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300',
        active ? 'text-accent after:scale-x-100' : 'text-ink after:scale-x-0 hover:after:scale-x-100',
      )}
    >
      {link.label}
    </a>
  );
}
