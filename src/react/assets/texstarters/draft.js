export const draftTex = '\\documentclass[12pt,a4paper]{article}\n\
\\usepackage[margin=1in,headheight=14.5pt]{geometry}\n\
\\usepackage{amsfonts}\n\
\\usepackage[english]{babel}\n\
\\usepackage[toc,page]{appendix}\n\
\\usepackage{graphicx}\n\
\\usepackage{enumitem}\n\
\\usepackage{setspace}\n\
\\usepackage[autostyle, english = american]{csquotes}\n\
\\MakeOuterQuote{"}\n\
\\usepackage{indentfirst}\n\
\\usepackage{amsmath}\n\
\\usepackage{amssymb}\n\
\\usepackage{float}\n\
\\usepackage{subcaption}\n\
\\usepackage{caption}\n\
\\usepackage{tablefootnote}\n\
\\usepackage{mathtools}\n\
\\DeclarePairedDelimiter\\ceil{\\lceil}{\\rceil}\n\
\\DeclarePairedDelimiter\\floor{\\lfloor}{\\rfloor}\n\
\\usepackage[authoryear,comma,numbers,sort]{natbib}\n\
\\bibliographystyle{abbrvnat}\n\
\\usepackage[hyphens]{url}\n\
\\usepackage[hidelinks]{hyperref}\n\
\\hypersetup{breaklinks=true}\n\
\\urlstyle{same}\n\
\\numberwithin{equation}{section}\n\
%for theorems and proofs\n\
\\usepackage{amsthm}\n\
\\theoremstyle{plain}\n\
\\newtheorem{theorem}{Theorem}[section]\n\
\\newtheorem{definition}{Definition}[section]\n\
\\newtheorem{corollary}{Corollary}[theorem]\n\
\\newtheorem{lemma}{Lemma}[theorem]\n\
\\newtheorem{proposition}{Proposition}[section]\n\
\\renewcommand\\qedsymbol{$\\blacksquare$}\n\
\\usepackage{chngcntr}\n\
\\usepackage{apptools}\n\
\\AtAppendix{\\counterwithin{lemma}{section}}\n\
\\AtAppendix{\\counterwithin{theorem}{section}}\n\
\\AtAppendix{\\counterwithin{definition}{section}}\n\
\\AtAppendix{\\counterwithin{proposition}{section}}\n\
\\newcommand{\\vc}[3]{\\overset{#2}{\\underset{#3}{#1}}}\n\
\\counterwithout{footnote}{section}\n\
%For the code snippets\n\
\\usepackage{xcolor}\n\
\\usepackage{listings}\n\
\\lstset{\n\
  basicstyle=\\ttfamily,\n\
  breakatwhitespace=true,\n\
  breaklines=true,\n\
  frame=single,\n\
  keepspaces=true,\n\
  backgroundcolor=\\color{gray!10},\n\
  keywordstyle=\\color{green!40!black},\n\
  columns=flexible\n\
}\n\
% DO NOT CHANGE ANYTHING FROM ABOVE\n\
% UNLESS YOU KNOW EXACTLY WHAT YOU ARE DOING!!\n\
\n\
% To see the power of TeX in action,\n\
% write something (important or will not work)\n\
% under the begin document command and\n\
% press "compile" (make sure that you save your\n\
% file with a name like "thesis.tex", with emphasis\n\
% in the extension .tex\n\
% or the the compiler will not work).\n\
% Now go write whatever you want and TeX\n\
% will make it look beautiful for you!!\n\
\n\
% If you need a bibliography page then\n\
% make sure that just before the\n\
% end document command\n\
% you put in the brackets of the\n\
% bibliography command\n\
% the name of your document\n\
% without extensions!\n\
% To see how to use the bibliography and\n\
% references commands,\n\
% check the Thesis Template\n\
\n\
% BEGIN AND END DOCUMENT SHOULD ALWAYS BE\n\
% AT THE TOP AND BOTTOM OF YOUR TEXT\n\
\\begin{document}\
Write something here...\
\\end{document}'

export const draftBib = ''
