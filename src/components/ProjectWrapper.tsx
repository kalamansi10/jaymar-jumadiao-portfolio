import ImageSlider from "./ImageSlider";
import useRandomizer from "../hooks/useRandomizer";
import useListAnimation from "../hooks/useListAnimation";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  source_code_link: string;
  live_preview_link: string;
  preview_images: string[];
}

interface ProjectWrapperProps {
  project: Project;
}

const ProjectWrapper: React.FC<ProjectWrapperProps> = ({ project }) => {
  const { getColor, getRandomTilt } = useRandomizer();

  useListAnimation();

  function mapTechStack() {
    return project.technologies.map((technology: string, index: number) => (
      <li
        className="tech-item anim-list-item"
        key={index}
        style={{
          transform: getRandomTilt(),
          display: "inline-block",
          backgroundColor: getColor(),
        }}
      >
        {technology}
      </li>
    ));
  }

  function renderLiveLink() {
    return (
      <a href="#">
        <button className="btn-3">No Preview</button>
      </a>
    );

    // if (project.live_preview_link.length) {
    //   return (
    //     <a href={project.live_preview_link}>
    //       <button
    //         className="btn-1"
    //         onClick={openLinkInNewTab}
    //         value={project.live_preview_link}
    //       >
    //         Live Preview
    //       </button>
    //     </a>
    //   );
    // } else {
    //   return (
    //     <a href="#">
    //       <button className="btn-3">No Preview</button>
    //     </a>
    //   );
    // }
  }

  function openLinkInNewTab(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.value) {
      window.open(target.value, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="project-wrapper">
      <section className="proj-preview">
        <ImageSlider imageLinks={project.preview_images} />
      </section>
      <section className="proj-description">
        <h2>{project.name}</h2>
        <br />
        <p>{project.description}</p>
        <div className="proj-links">
          <a href={project.source_code_link}>
            <button
              className="btn-2"
              onClick={openLinkInNewTab}
              value={project.source_code_link}
            >
              Source Code
            </button>
          </a>
          {renderLiveLink()}
        </div>
      </section>
      <section className="proj-tech">
        <h3>Tech Used:</h3>
        <ul className="tech-list">{mapTechStack()}</ul>
      </section>
    </div>
  );
};

export default ProjectWrapper;
