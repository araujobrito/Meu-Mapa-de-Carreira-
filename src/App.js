import './App.css';
import foto from './fotojv.jpg';
import { useEffect, useState } from 'react';
import curriculo from "./Curriculo - João Victor Araujo de Brito 2026.docx"

function Header() {
  return (
    <header className='header'>
      <img src={foto} alt='Minha foto' className='header-foto' />
      <div className='info'>
        <h1>João Victor </h1>
        <p className='cargo'> Software Developer - Web Developer - </p>
        <a href="mailto:araujodebritoj@gmail.com" className='email'>
          araujodebritoj@gmail.com
        </a>
      </div>
      <div className='links'>
        <a href='https://linkedin.com/in/araujobrito' target='_blank' rel='noreferrer'>Linkedin</a>
        <a href='https://github.com/araujobrito' target='_blank' rel='noreferrer'>Github</a>
      </div>
    </header>
  )
}

function SobreMim() {
  return (
  <section className='sobre'>
    <h2>Prazer em conhecer</h2>
    <p>
     Formado em Análise e Desenvolvimento de Sistemas e apaixonado por tecnologia e desenvolvimento de software. Como PCD Auditivo, desenvolvi resiliência, foco e capacidade de adaptação diante dos desafios. Possuo conhecimentos em PHP, C#, Python, JavaScript, React, MySQL, Git e Github adquiridos por meio de estudos e projetos acadêmicos. Futuramente quero cursar Ciência da Computação para construir uma carreira sólida como Engenheiro de Software.
    </p>
    <a href={curriculo}
    download={'Curriculo'}
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
          titulo="Desenvolvedor Back-End Júnior"
          status="Principal"
          descricao="Fase de consolidação dos fundamentos de programação, banco de dados e desenvolvimento de APIs, aplicando boas práticas de código e colaborando em projetos para adquirir experiência profissional."
          softSkills={[
            'Comunicação clara com o time',
            'Curiosidade ativa',
            'Resiliência com feedback',
            'Organização de tarefas',
            'Resolução de problemas',
            'Pensamento lógico',
            'Aprendizado contínuo'
          ]}
          techs={['PHP', 'C#', 'Python',  'MySQL', 'Git', 'GitHub', 'APIs REST']}
          />
          <Etapa
          titulo="Desenvolvedor Back-End Pleno"
          status="próximo"
          descricao="Desenvolver aplicações com autonomia, criar e manter APIs REST, realizar integrações entre sistemas, otimizar consultas em banco de dados e contribuir para decisões técnicas da equipe, garantindo qualidade, desempenho e escalabilidade das soluções."
          softSkills={[
            'Estimar esforço e cumprir prazos',
            'Dar e receber feedback',
            'Colaborar com equipes multidisciplinares',
            'Resolver problemas complexos',
            'Mentorar desenvolvedores juniores'
          ]}
          techs={['Java', 'Spring Boot', 'React', 'MySQL/PostgreSQL', 'APIs REST', 'Git/GitHub', 'Testes','Docker']}
          />
          <Etapa
          titulo="Engenheiro de Software"
          status="futuro"
          descricao="Responsável por projetar, desenvolver e evoluir sistemas de software escaláveis, seguros e eficientes. Atua na definição de arquiteturas, boas práticas de desenvolvimento, integração entre sistemas e tomada de decisões técnicas estratégicas para garantir a qualidade e a sustentabilidade das aplicações."
          softSkills={[
            'Liderança técnica',
            'Comunicação com equipes e stakeholders',
            'Tomada de decisões',
            'Liderança técnica',
            'Resolução de problemas complexos',

          ]}
          techs={['Arquitetura de Software', 'Design Patterns', 'Cloud (AWS/Azure)', 'Microserviços', 'Docker', 'Kubernetes', 'Segurança de Aplicações']}
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
          <span className="idioma-nome">English</span>
        </div>
        <div className="idioma-item">
          <span className="idioma-nome">Espanõl</span>
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
