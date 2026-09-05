import { motion } from 'framer-motion'
import person1 from '../assets/person1.png'
import person2 from '../assets/person2.png'
import person3 from '../assets/person3.png'

const teamMembers = [
  {
    name: 'Aarav Mehta',
    role: 'Founder & Creative Director',
    image: person1,
    description:
      "Leads the studio's vision across architecture, interiors, construction, and client relationships.",
  },
  {
    name: 'Rohan Kapoor',
    role: 'Project Management & Construction',
    image: person2,
    description:
      'Manages project execution, coordinating contractors, suppliers, site activities, timelines, and quality.',
  },
  {
    name: 'Karan Sharma',
    role: 'Architecture & Project Completion',
    image: person3,
    description:
      'Oversees architectural development and coordinates projects through completion with attention to quality and detail.',
  },
]

function TeamCard({ member, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group flex min-h-32 items-center gap-3 rounded-2xl border border-white/10 bg-white/6 p-3 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-gold/35"
    >
      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/10">
        <img
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-xl leading-tight text-white">{member.name}</h3>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
          {member.role}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-white/70">{member.description}</p>
      </div>
    </motion.article>
  )
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-teal py-24 text-white">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.32em] text-gold">About us</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">A studio for spaces that change how you live</h2>
          <p className="mt-5 leading-relaxed text-white/75">
            Welcome to our interior design studio, where creativity and innovation meet to transform
            spaces into stunning works of art. With a team of designers and architects, we create
            unique environments that reflect each client&apos;s vision — from a single room to a complete
            renovation, residential to commercial.
          </p>
          <p className="mt-4 leading-relaxed text-white/75">
            Our vision is to create spaces that inspire and transform lives. The environments we
            inhabit shape mood, productivity, and well-being. We blend creativity, innovation, and
            practicality — then we build it.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {[
            {
              k: 'Experience',
              v: 'Years of residential and commercial work across South India, honing planning, detailing, and site execution.',
            },
            {
              k: 'Mission',
              v: 'Captivating, functional environments that reflect personality — without sacrificing how a home actually works.',
            },
            {
              k: 'Method',
              v: 'Consultation, design visualization, construction, installation, quality checks, and final handover with warranty-backed hardware.',
            },
            {
              k: 'Promise',
              v: '6+4 years warranty, premium materials, and quality workmanship — because luxury should be built to last.',
            },
          ].map((card) => (
            <div key={card.k} className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur">
              <p className="text-sm font-semibold tracking-wide text-gold">{card.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{card.v}</p>
            </div>
          ))}
        </motion.div>
        <div className="col-span-full mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
