import { Navigate, useParams } from "react-router-dom";
import ProjectDetails from "../components/Projects/ProjectDetails";
import { getProjectBySlug } from "../content/portfolio";

const ProjectDetailPage = () => {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="px-4 pb-20 md:pb-28">
      <ProjectDetails project={project} />
    </div>
  );
};

export default ProjectDetailPage;
