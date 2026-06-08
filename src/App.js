import './App.css';
import foto from './foto.png';
import { useEffect, useState } from 'react';
import curriculo from "./Curriculo_Iasmin_Lopes.pdf"

function Header() {
  return (
    <header className='header'>
      <img src={foto} alt='Minha foto' className='header-foto' />
      <div className='info'>
        <h1>Iasmin Lopes</h1>
        <p className='cargo'>Fullstack - React - Java - Python</p>
        <a href="mailto:iasminmoreira09@gmail.com" className='email'>
          iasminmoreira09@gmail.com
        </a>
      </div>
      <div className='links'>
        <a href='https://www.linkedin.com/feed/' target='_blank' rel='noreferrer'>Linkedin</a>
        <a href='https://github.com/IasminMoreira/monitoria' target='_blank' rel='noreferrer'>Github</a>
      </div>
    </header>
  )
}

function SobreMim() {
  return (
  <section className='sobre'>
    <h2>Prazer em conhecer</h2>
    <p>
      Futura Engenheira de Computação apaixonada por transformar linhas de código em soluções que impactam vidas. Atualmente curso Desenvolvimento Web Java no Instituto PROA, onde também atuo como monitora e ponto focal — porque acredito que o sucesso de um é o sucesso de todos. Tenho experiência prática com Java, React, JavaScript e CSS, base em automação industrial com Arduino e ESP32, e busco evoluir como desenvolvedora Fullstack focada em código limpo e colaboração.
    </p>
    <a href={curriculo}
    download={'Curriculo_Iasmin_Lopes.pdf'}
    className='btn-cv' target='_blank' rel='noreferrer'>
      Baixar meu CV
    </a>
  </section>
  )
}

function Etapa({ titulo, status, descricao, softSkills, techs }) {
  const [aberta, setAberta] = useState (status === 'atual');
  return (
    <div className='etapa-wrapper'>
      <div className='timeline-dot' />
      <div className={`etapa ${status}`}>
        <div className='etapa-header' onClick={() => setAberta(!aberta)}>
          <h3>{titulo}</h3>
          <div style={{display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className='indicador'>
            {status === 'atual' ? 'Você está aqui' : status === 'proximo' ? 'Próximo passo' : 'Objetivo'}
          </span>
          <span className="seta">{aberta ? "▲" : "▼"}</span>
        </div>
        </div>
      {aberta && (
        <div className='etapa-corpo'>
          <p className='etapa-desc'>{descricao}</p>
          <p className='etapa-sub'>Soft skills essenciais:</p>
          <ul className='etapa-lista'>
            {softSkills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p className='etapa-sub'>Roadmap de aprendizado</p>
          <div className='etapa-tags'>
            {techs.map((t, i) => <span key={i} className='tech-tag'>{t}</span>)}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

function MapaCarreira() {
  return (
    <section className='mapa'>
      <h2>Mapa de Carreira</h2>
      <div className='timeline'>
        <Etapa
          titulo="Desenvolvedora Júnior"
          status="atual"
          descricao="Fase de consolidar as bases e entregar features com qualidade."
          softSkills={[
            'Comunicação clara com o time',
            'Curiosidade ativa',
            'Resiliência com feedback',
            'Organização de tarefas',
          ]}
          techs={['React', 'JavaScript', 'HTML/CSS', 'Git']}
          />
          <Etapa
          titulo="Desenvolvedora Pleno"
          status="proximo"
          descricao="Autonomia total em features. Liderar tecnicamente e revisar código."
          softSkills={[
            'Estimar esforço e cumprir prazos',
            'Dar e receber feedback',
            'Colaborar com designers e PMs',
            'Identificar problemas antes de virarem incidentes',
          ]}
          techs={['TypeScripy', 'Next.js', 'MySQL', 'Testes']}
          />
          <Etapa
          titulo="Desenvolvedora Sênior"
          status="futuro"
          descricao="Refência técnica do time. Definir padrões e mentorar"
          softSkills={[
            'Mentoria de pessoas',
            'Visão de produto',
            'Comunicar para não devs',
            'Liderança técnica',
          ]}
          techs={['Docker', 'AWS', 'System Design', 'CI/CD']}
          />
      </div>
    </section>
  )
}

function SkillBar ({nome, porcentagem}) {
  return (
    <div className='skill'>
      <div className='skill-topo'>
        <span className='skill-nome'>{nome}</span>
        <span className='skill-pct'>{porcentagem}</span>
      </div>
      <div className='skill-barra-bg'>
        <div className='skill-barra' style={{width:`${porcentagem}%`}}/>
      </div>
    </div>
  )
}

function Skills() {
  const [linguagens, setLinguagens] = useState({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarLinguagens() {
      try {
        const resposta = await fetch(
          'https://api.github.com/users/IasminMoreira/repos',
        );
        const repos = await resposta.json();

        const contagem = {};
        repos.forEach(repo => {
          if (repo.language) {
            contagem[repo.language] = (contagem[repo.language] || 0) + 1;
          }
        });

        setLinguagens(contagem);
      } catch (erro) {
        console.error('Erro ao buscar GitHub:', erro);
      } finally {
        setCarregando(false);
      }
    }

    buscarLinguagens();
  }, []);

  const total = Object.values(linguagens).reduce((a, b) => a + b, 0);
  const calcularPct = (qtd) => Math.round((qtd / total) * 100);

  const conhecimentos = [
    { nome: 'JavaScript', porcentagem: 80 },
    { nome: 'HTML/CSS', porcentagem: 70 },
    { nome: 'Python', porcentagem: 60 },
    { nome: 'React', porcentagem: 40 },
    { nome: 'Java', porcentagem: 40 },
  ];

  return (
    <section className="skills">
      <h2>Skills</h2>

      <p className="skill-grupo-titulo">Conhecimentos</p>
      {conhecimentos.map((s, i) => (
        <SkillBar key={i} nome={s.nome} porcentagem={s.porcentagem} />
      ))}

      {carregando ? (
        <p style={{ fontSize: '13px', color: '#888', marginTop: '1rem' }}>
          Carregando dados do GitHub...
        </p>
      ) : (
        <>
          <p className="skill-grupo-titulo" style={{ marginTop: '1.25rem' }}>
            Do GitHub
          </p>
          {Object.entries(linguagens)
            .sort((a, b) => b[1] - a[1])
            .map(([lang, qtd]) => (
              <SkillBar key={lang} nome={lang} porcentagem={calcularPct(qtd)} />
            ))}
        </>
      )}

      <div className="idiomas">
        <p className="skill-grupo-titulo">Idiomas</p>
        <div className="idioma-item">
          <span className="idioma-nome">Português</span>
        </div>
        <div className="idioma-item">
          <span className="idioma-nome">Inglês</span>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className='pagina'>
      <div className='folha'>
        <Header />
        <div className='folha-corpo'>
          <SobreMim />
          <div className='conteudo-principal'>
            <MapaCarreira />
            <Skills />
          </div>
        </div>
      </div>
    </div>
  )
}
