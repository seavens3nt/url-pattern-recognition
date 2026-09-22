import './styles/about_us.css';
import ranee_pic from '../../profile_pics/ranee.jpeg';
import paul_pic from '../../profile_pics/paul.jpeg';
import isaiah_pic from '../../profile_pics/isaiah.png';
import pamela_pic from '../../profile_pics/pamela.jpeg';
import kenneth_pic from '../../profile_pics/kenneth.jpeg';
import sean_pic from '../../profile_pics/sean.jpeg';
import jared_pic from '../../profile_pics/jared.jpeg';
import cedric_pic from '../../profile_pics/cedric.jpeg';

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
        loading="lazy"
        width="112"
        height="112"
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
    <main className="about-main">
      <section className="about-intro">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          Building technology that makes everyday problems simpler.
        </p>
      </section>

      <section className="about-flow" aria-label="Who we are">
        <article className="about-card about-card--wide">
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

        <article className="about-card">
          <h2 className="about-card__title">Our Mission</h2>
          <p>
            To build meaningful digital experiences that are simple, useful, and
            accessible.
          </p>
        </article>

        <div className="about-connector" aria-hidden="true" />

        <article className="about-card">
          <h2 className="about-card__title">What We Value</h2>
          <p className="about-card__values">
            Innovation &middot; Simplicity &middot; Accessibility &middot; Reliability
          </p>
        </article>
      </section>

      <section className="about-team" aria-label="Meet the team">
        <h2 className="about-team__title">
          Meet the Team <span aria-hidden="true">&rarr;</span>
        </h2>
        <p className="about-team__subtitle">Minds Behind the Code</p>

        <ul className="about-team__grid">
          {TEAM.map((member, index) => {
            const side = Math.floor(index / 2) % 2 === 0 ? 'left' : 'right';

            return (
              <li
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
