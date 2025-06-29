import type { GitHubContributor } from "@/types/GitHubContributer";

export async function fetchGitHubContributors(): Promise<GitHubContributor[]> {
  const response = await fetch(
    'https://api.github.com/repos/softwaredevelopersofcalgary/sdc-v3/contributors',
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch contributors');
  }

  return response.json();
}