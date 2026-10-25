import { motion, useReducedMotion } from 'framer-motion'

const profile = {
  name: 'Nimsara Pathirana',
  position: 'Site Engineer',
  organization: 'Smart Wireless Engineering Networks Pvt. Ltd.',
  phone: '+94 70 618 1472',
  whatsapp: '+94 70 618 1472',
  email: 's_eng@tecgate.lk',
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.8 9.4 3a1 1 0 0 1 1.2.5l1.2 2.8a1 1 0 0 1-.3 1.2L10 8.8a14 14 0 0 0 5.2 5.2l1.3-1.5a1 1 0 0 1 1.2-.3l2.8 1.2a1 1 0 0 1 .5 1.2l-.8 2.3a2 2 0 0 1-2 1.3A15.5 15.5 0 0 1 4.8 6a2 2 0 0 1 1.3-2.2Z" /></svg>
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.1-4.7A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="M8.2 7.8c.2-.4.5-.5.8-.5h.4c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.5.6c-.2.2-.2.4-.1.6.5 1 1.3 1.8 2.3 2.3.2.1.4.1.6-.1l.7-.8c.2-.2.4-.3.7-.2l1.6.8c.3.1.4.3.4.5 0 .3-.2.9-.6 1.2-.4.4-1 .6-1.7.5-1-.1-2.2-.7-3.5-1.9-1.1-1-1.9-2.3-2.2-3.4-.2-.9 0-1.7.4-2.4Z" />
    </svg>
  )
}

function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17V7A1.5 1.5 0 0 1 4 5.5Zm-.1 2 7.5 5.4a1 1 0 0 0 1.2 0l7.5-5.4" /></svg>
}

function ContactLink({ href, label, detail, icon, external = false }: {
  href: string
  label: string
  detail: string
  icon: React.ReactNode
  external?: boolean
}) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="contact-link"
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.985 }}
      aria-label={`${label}: ${detail}`}
    >
      <span className="contact-icon">{icon}</span>
      <span className="contact-copy"><span className="contact-label">{label}</span><span className="contact-detail">{detail}</span></span>
      <svg className="contact-arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>
    </motion.a>
  )
}

function handleAddContact() {
  const vcard = [
    'BEGIN:VCARD', 'VERSION:3.0',
    `FN:${profile.name}`, `ORG:${profile.organization}`, `TITLE:${profile.position}`,
    `TEL;TYPE=CELL:${profile.phone.replace(/\s/g, '')}`, `EMAIL:${profile.email}`, 'END:VCARD',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'Nimsara_Pathirana.vcf'
  link.click()
  URL.revokeObjectURL(url)
}

export default function ProfileCard() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="profile-card"
      initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="portrait-panel">
        <img className="portrait-image" src="/profile.png" alt="Nimsara Pathirana" />
        <div className="portrait-vignette" />
      </div>

      <div className="profile-details">
        <div className="identity">
          <p className="eyebrow">SITE ENGINEER</p>
          <h1>{profile.name}</h1>
          <p className="organization">{profile.organization}</p>
        </div>

        <nav className="contact-list" aria-label="Contact Nimsara">
          <ContactLink href={`tel:${profile.phone.replace(/\s/g, '')}`} label="Phone" detail={profile.phone} icon={<PhoneIcon />} />
          <ContactLink href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`} label="WhatsApp" detail={profile.whatsapp} icon={<WhatsAppIcon />} external />
          <ContactLink href={`mailto:${profile.email}`} label="Email" detail={profile.email} icon={<MailIcon />} />
        </nav>

        <motion.button
          type="button"
          className="save-contact"
          onClick={handleAddContact}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.985 }}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v9m0 0 3-3m-3 3L7 9M4 13v3h12v-3" /></svg>
          <span>Save contact</span>
        </motion.button>

        <div className="details-footer"><img src="/swenlogo.png" alt="SWEN - Smart Wireless Engineering Networks" className="footer-logo" /></div>
      </div>
    </motion.article>
  )
}
