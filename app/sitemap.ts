import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://collegecompass.in";

  const staticRoutes = [
    "",
    "/colleges",
    "/courses",
    "/compare",
    "/exams",
    "/scholarships",
    "/blogs",
    "/about",
    "/contact",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return staticRoutes;
}