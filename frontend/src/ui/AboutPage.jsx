import './styles/about_us.css';
import ranee_pic from '../../profile_pics/ranee.webp';
import paul_pic from '../../profile_pics/paul.webp';
import isaiah_pic from '../../profile_pics/isaiah.webp';
import pamela_pic from '../../profile_pics/pamela.webp';
import kenneth_pic from '../../profile_pics/kenneth.webp';
import sean_pic from '../../profile_pics/sean.webp';
import jared_pic from '../../profile_pics/jared.webp';
import cedric_pic from '../../profile_pics/cedric.webp';

const TEAM = [
  { name: 'Ranee Mikaella Gutierrez',   role: 'Project Manager / Integration Lead',   photo: ranee_pic },
  { name: 'Sean Matthew Tumolac',       role: 'Automata Optimizer',                   photo: sean_pic },
  { name: 'Isaiah Jasser Otilano',      role: 'UI/UX & Language Analyst',             photo: isaiah_pic },
  { name: 'Jared Noel',                 role: 'Simulator Programmer',                 photo: jared_pic },
  { name: 'Ralph Kenneth Punzalan',     role: 'RegEx / NFA Designer',                 photo: kenneth_pic },
  { name: 'Paul Joshua Campos',         role: 'QA / Tester',                          photo: paul_pic },
  { name: 'Pamela Babaran',             role: 'DFA Designer',                         photo: pamela_pic },
  { name: 'Cedric Kristoff Sigue',      role: 'Documentation / Presentation Lead',    photo: cedric_pic },
];

function initialsOf(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

function Avatar({ member }) {
  const src = member.photo;

  if (src) {
    return (
      <img
        className="about-member__img"
        src={src}
        alt={member.name}
        loading="eager"
        decoding="async"
        width="136"
        height="136"
      />
    );
  }

  return (
    <span className="about-member__initials" aria-hidden="true">
      {initialsOf(member.name)}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="about-main w-full flex-[1_0_auto] bg-transparent px-6 text-center">
      <div className="about-overview">
      <section className="about-intro">
        <h1 className="about-title m-0 text-[clamp(42px,6vw,64px)] font-extrabold tracking-[-0.8px] text-[var(--upr-navy)]">About Us</h1>
        <p className="about-subtitle mx-auto mt-4 max-w-[760px] text-[clamp(16px,2vw,20px)] leading-[1.5] text-[#5c6a95]">
          Building technology that makes everyday problems simpler.
        </p>
      </section>

      <section className="about-flow mx-auto mt-10 flex w-full max-w-[880px] flex-col items-center" aria-label="Who we are">
        <article data-reveal className="about-card about-card--wide w-full rounded-[18px] border border-[rgba(22,37,92,0.16)] bg-white px-8 py-7 shadow-[0_10px_26px_rgba(22,37,92,0.08)] max-[620px]:px-5 max-[620px]:py-6">
          <p>
            We are a team of developers and designers focused on creating practical,
            accessible digital solutions. What started as a small student project grew
            from our belief that technology should not only look good, it should solve
            real problems.
          </p>
          <p>
            Our goal is to combine thoughtful design, reliable technology, and
            user-centered development to create products people actually enjoy using.
          </p>
        </article>

        <div className="about-connector" aria-hidden="true" />

        <article data-reveal className="about-card w-full rounded-[18px] border border-[rgba(22,37,92,0.16)] bg-white px-8 py-7 shadow-[0_10px_26px_rgba(22,37,92,0.08)] max-[620px]:px-5 max-[620px]:py-6">
          <h2 className="about-card__title">Our Mission</h2>
          <p>
            To build meaningful digital experiences that are simple, useful, and
            accessible.
          </p>
        </article>

        <div className="about-connector" aria-hidden="true" />

        <article data-reveal className="about-card w-full rounded-[18px] border border-[rgba(22,37,92,0.16)] bg-white px-8 py-7 shadow-[0_10px_26px_rgba(22,37,92,0.08)] max-[620px]:px-5 max-[620px]:py-6">
          <h2 className="about-card__title">What We Value</h2>
          <p className="about-card__values">
            Innovation &middot; Simplicity &middot; Accessibility &middot; Reliability
          </p>
        </article>
      </section>
      </div>

      <section className="about-team" aria-label="Meet the team">
        <div data-reveal>
        <h2 className="about-team__title">
          Meet the Team <span aria-hidden="true">&rarr;</span>
        </h2>
        <p className="about-team__subtitle">Minds Behind the Code</p>
        </div>

        <ul className="about-team__grid">
          {TEAM.map((member, index) => {
            const side = Math.floor(index / 2) % 2 === 0 ? 'left' : 'right';

            return (
              <li
                data-reveal
                key={member.name}
                className={`about-member about-member--${side}`}
              >
                <div className="about-member__photo">
                  <Avatar member={member} />
                </div>

                <div className="about-member__body">
                  <p className="about-member__name">{member.name}</p>
                  <p className="about-member__role">{member.role}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
