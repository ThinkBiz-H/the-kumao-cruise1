import Container from '../ui/Container';
import { site } from '../../data/siteContent';

export default function Footer() {
  return (
    <footer className="py-9 pb-[calc(2.25rem+env(safe-area-inset-bottom))]">
      <Container>
        <p className="text-center text-[0.82rem]">
          {site.name} · {site.address.full} · © {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
