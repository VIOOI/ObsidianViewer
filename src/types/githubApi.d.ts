declare interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

declare type GitHubFileContent = GitHubFile & {
  content: string;
  encoding: string;
};

declare type GitHubError = {
  message: string;
  documentation_url: string;
};
