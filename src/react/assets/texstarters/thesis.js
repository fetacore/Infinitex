export const thesisTex = '\\documentclass[12pt,twoside,openright]{book}\n\
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
\\usepackage{fancyhdr}\n\
%\\renewcommand{\\headrulewidth}{0.0pt}%\n\
\\renewcommand{\\chaptermark}[1]{\\markboth{#1}{}}\n\
\\fancyhf{}\n\
\\fancyhead[LO]{\\leftmark}\n\
\n\
\\fancyhead[RE]{\\rightmark}\n\
\\fancyfoot[C]{\\thepage}\n\
\\pagestyle{fancy}\n\
\n\
\\numberwithin{equation}{section}\n\
\n\
%for theorems and proofs\n\
\\usepackage{amsthm}\n\
\\theoremstyle{plain}\n\
\\newtheorem{theorem}{Theorem}[section]\n\
\\newtheorem{definition}{Definition}[chapter]\n\
\\newtheorem{corollary}{Corollary}[theorem]\n\
\\newtheorem{lemma}{Lemma}[theorem]\n\
\\newtheorem{proposition}{Proposition}[chapter]\n\
\\renewcommand\\qedsymbol{$\\blacksquare$}\n\
\n\
\\usepackage{chngcntr}\n\
\\usepackage{apptools}\n\
\\AtAppendix{\\counterwithin{lemma}{chapter}}\n\
\\AtAppendix{\\counterwithin{theorem}{chapter}}\n\
\\AtAppendix{\\counterwithin{definition}{chapter}}\n\
\\AtAppendix{\\counterwithin{proposition}{chapter}}\n\
\n\
\\newcommand{\\vc}[3]{\\overset{#2}{\\underset{#3}{#1}}}\n\
\\usepackage{chngcntr}\n\
\\counterwithout{footnote}{chapter}\n\
\n\
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
\n\
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
\n\
% BEGIN AND END DOCUMENT SHOULD ALWAYS BE\n\
% AT THE TOP AND BOTTOM OF YOUR TEXT\n\
\n\
\\begin{document}\
\\frontmatter\n\
\\thispagestyle{empty}\n\
\\begin{center}\n\
\\begin{minipage}{0.75\\linewidth}\n\
\\centering\n\
%\\includegraphics[scale=0.7]{UniversityLogo.jpg}\\\n\
\\vspace{3cm}\n\
{\\uppercase{\\Large \\textbf{Subject of Thesis}\\par}}\n\
\\vspace{3cm}\n\
{\\uppercase {\\large Author\\par}}\n\
\\vspace{3cm}\n\
{\\large Dissertation submitted\\\\ in partial fulfilment of the necessary prerequisites\\\\ for the acquisition of the MSc. Degree\\par}\n\
\\vspace{3cm}\n\
{\\large City}\\\\\n\
{Date}\n\
\\end{minipage}\n\
\\end{center}\n\
\\clearpage\n\
\n\
\\newpage\n\
\\thispagestyle{empty}\n\
\\vspace{3cm}\n\
\\begin{center}\n\
\\textbf{We approve the dissertation of Author}\n\
\\end{center}\n\
\\vspace{4cm}\n\
\\textbf{Professor/Supervisor Name)}\\\\ University\n\
\\vspace{3cm}\\\\\n\
\\textbf{Professor}\\\\ University\n\
\\vspace{3cm}\\\\\n\
\\textbf{Professor}\\\\ University\n\
\\newpage\n\
\\tableofcontents\n\
\\thispagestyle{empty}\n\
\\addtocontents{toc}{\\protect\\thispagestyle{empty}}\n\
\n\
\\chapter*{Summary}\n\
\\thispagestyle{empty}\n\
\n\
Abstract goes here\n\
\n\
\\newpage\n\
\\thispagestyle{empty}\n\
\n\
\\mainmatter\n\
\n\
\\chapter*{Introduction}\n\
\\addcontentsline{toc}{chapter}{Introduction}\n\
\\chaptermark{Introduction}\n\
Introduction\n\
\\chapter{Enumerated Chapter} \\label{ReferToItLikeThatInTheThesis}\n\
\\section{Section of Chapter}\n\
\\appendix\n\
\\chapter{Proofs of Chapter 1}\\label{appendix1}\n\
\\begin{theorem}\n\
\\citep{cybenko1989}\n\
Let $\\mathcal{S}$ be any continuous \\textit{sigmoidal} function, $x \\in \\mathbb{R}^n$ and $w_j \\in \\mathbb{R}^n$. Then functions of the form \
$$G(x) = \\sum_{j=1}^{J} \\tilde{w}_j \\mathcal{S}\\left\\lbrace  w\'_{j} x+ b_j \\right\\rbrace$$ are dense\\footnote{\n\
\\begin{definition}\n\
A set $A$ which is a subset of a topological space $X$ is termed dense in $X$ if $\\forall x \\in X$ it is true that $x \\in A$ \
or $x$ is a limit point of $A$. A limit point of a set $A \\subset X$ is some $x \\in X$ that has the property \
that $\\left(O_d(x,\\varepsilon) \\cap A\\right) \\neq \\varnothing$ for any $\\varepsilon > 0$ and the point of intersection is not $x$ itself.\n\
\\end{definition}\n\
}\n\
in the space of continuous functions on the $n$-dimensional unit cube $[0,1]^n$, i.e. given any function $f \\in \\mathcal{C}(I_n)$ \
and $\\varepsilon > 0$, there is a function of the above form for which, $\\forall x \\in I_n$,\
$$ |G(x) - f(x)| < \\varepsilon$$\n\
\\end{theorem}\n\
\\begin{proof}\n\
We first need to prove that the theorem holds for any continuous discriminatory \\footnote{\n\
\\begin{definition}\n\
A function $\\mathcal{S}$ is \\textit{discriminatory} if, for a measure $\\mu$ in the space of finite, \
signed regular Borel measures on $I_n$, denoted as $\\mathcal{M}(I_n)$, it is true that \
$$\\int_{I_n} \\mathcal{S}(w\'x + b) d\\mu(x) = 0$$ \
for all $w \\in \\mathbb{R}^n$ and $b \\in \\mathbb{R}$, implies that $\\mu=0$.\n\
\\end{definition}\n\
} \
function $\\mathcal{S}$. Let $\\mathcal{G}$ be the set that contains all the functions of the form of $G$, \
which are linear and continuous, so that $\\mathcal{G}\\subset \\mathcal{C}(I_n)$.\
\n\
We now need to prove that the closure\\footnote{\n\
\\begin{definition}\n\
The closure of a set $\\mathcal{G}\\subset \\mathbb{R}^n$, say $\\tilde{\\mathcal{G}}$ is the set $\\mathcal{G}$ with all of its limit points.\n\
\\end{definition}\n\
} \
of $\\mathcal{G}$ is the whole of $\\mathcal{C}(I_n)$.\\\\ Suppose not. \n\
Lets assume that the closure of $\\mathcal{G}$ is not all of $\\mathcal{C}(I_n)$ but rather some closed proper subspace of \
$\\mathcal{C}(I_n)$, say $\\tilde{\\mathcal{G}}$. Since $\\mathcal{C}(I_n)$ is a real vector space and \
$\\tilde{\\mathcal{G}}$ is a finite proper subspace, we can define a subadditive positive homogeneous functional $p$ on $\\mathcal{C}(I_n)$ \
such that $G(g) \\leq p(g)$ $\\forall g \\in \\mathcal{G}$. \
By the Hahn-Banach separation theorem, there exists a linear functional $L$ on $\\mathcal{C}(I_n)$ such that $L(g)=G(g)$ \
for $g \\in \\tilde{\\mathcal{G}}$ but $L(g\') \\leq p(g\')$ for $g\' \\in \\mathcal{C}(I_n)$. \
What this suggests is that this functional $L$ has the property that $L\\neq 0$ but $L(\\tilde{\\mathcal{G}})=L(\\mathcal{G})=0$. \
By the Riesz Representation theorem, since $L$ is a bounded linear functional on the space of compactly supported continuous functions \
on $I_n$, it should be of the form $$L(g)=\\int_{I_n} g(x) d\\mu(x)$$ for some $\\mu \\in \\mathcal{M}(I_n)$ and \
$\\forall g \\in \\mathcal{C}(I_n)$, with $\\int$ being the Lebesgue integral wrt the measure $\\mu$. \
Since $\\mathcal{S}(w\'_j x + b_j)$ is in $\\tilde{\\mathcal{G}}$ $\\forall w_j , b_j$ it must be the case that \
$$\\int_{I_n} \\mathcal{S}(w\'_j x + b_j) d\\mu(x)=0$$ for all $w_j , b_j$. \
Since $\\mathcal{S}$ is assumed to be discriminatory, it must be the case that $\\mu=0$ by definition, \
but this contradicts our assumption. Therefore, it must be the case that $\\mathcal{G} \\subset \\mathcal{C}(I_n)$ is dense in $\\mathcal{C}(I_n)$.\n\
\n\
Now we need to prove that every continuous sigmoidal function is discriminatory and the proof is finished.\
\\\\In order to do that we can see that, for any value of $w_j, x, b_j,\\phi$, $$\\mathcal{S}\\left(\\lambda(w\'_j x + b_j) + \\phi \\right)$$ \
converges, as $\\lambda \\longrightarrow \\infty$, to a function of the form:\n\
\\[\n\
\\psi (x) =\\begin{cases}\n\
1 \\text{\\hspace{1cm}for $w\'_j x + b_j > 0$}\\\\ 0 \\text{\\hspace{1cm}for $w\'_j x + b_j < 0$}\\\\ \\mathcal{S}(\\phi) \\text{\\hspace{0.35cm}for $w\'_j x + b_j = 0$}\n\
\\end{cases}\n\\\]\\\n\
We can define $$\\Pi_{w_j, b_j} := \\lbrace x | w\'_j x + b_j = 0\\rbrace$$\n\
$$H_{w\'_j, b_j} := \\lbrace x|w\'_j x + b_j > 0\\rbrace$$ where $\\Pi_{w\'_j, b_j}$ is a hyperplane and $H_{w\'_j, b_j}$ \
is an open half-space. By the Lebesgue Bounded Convergence theorem we have that if $\\mathcal{S}1, \\mathcal{S}_2, \\ldots$ \
is a sequence of uniformly bounded real valued measurable functions that converge pointwise on a bounded measure space $(I_n,\\Sigma, \\mu)$ \
to a function $\\psi$, then $\\psi$ is an integrable function such that:\n\
$$\\lim_{\\lambda \\longrightarrow \\infty} \\int_{I_n} \\mathcal{S}_\\lambda(x) d\\mu(x) = \\int_{I_n} \\psi(x) d\\mu(x)$$\n\
where the last integral is equal to zero, and can be rewritten as:\n\
$$\\mathcal{S}(\\phi) \\mu(\\Pi_{w_j, b_j}) + \\mu(H_{w_j, b_j})=0$$\n\
for all $\\phi, b_j, w_j$. As a last step, if the measure of all half spaces is 0 then the measure $\\mu$ itself must be zero. \
Showing that the integral over any simple function, namely the indicator of any interval or sums of indicator functions of intervals \
and that the Fourier transform of $\\mu$ is equal to zero will prove that $\\mu=0$, therefore any continuous sigmoidal function is discriminatory.\n\
\\end{proof}\n\
\n\
\\bibliography{thesis}\n\
\\addcontentsline{toc}{chapter}{Bibliography}\n\
\\end{document}';

export const thesisBib = '@article{light1992ridge,\n\
  title={Ridge functions, sigmoidal functions and neural networks},\n\
  author={Light, Will},\n\
  year={1992},\n\
  publisher={Citeseer}\n\
}\n\
\n\
@book{christopher2006pattern,\n\
  title={Pattern recognition and machine learning},\n\
  author={Christopher M.. Bishop},\n\
  year={2006},\n\
  publisher={Springer}\n\
}\n\
\n\
@article{mcculloch1943logical,\n\
  title={A logical calculus of the ideas immanent in nervous activity},\n\
  author={McCulloch, Warren S and Pitts, Walter},\n\
  journal={The bulletin of mathematical biophysics},\n\
  volume={5},\n\
  number={4},\n\
  pages={115--133},\n\
  year={1943},\n\
  publisher={Springer}\n\
}\n\
\n\
@article{cybenko1989,\n\
  title={Approximation by superpositions of a sigmoidal function},\n\
  author={Cybenko, George},\n\
  journal={Mathematics of control, signals and systems},\n\
  volume={2},\n\
  number={4},\n\
  pages={303--314},\n\
  year={1989},\n\
  publisher={Springer}\n\
}\n\
\n\
@Manual{R,\n\
  title = {R: A Language and Environment for Statistical Computing},\n\
  author = {{R Development Core Team}},\n\
  organization = {R Foundation for Statistical Computing},\n\
  address = {Vienna, Austria},\n\
  year = {2008},\n\
  note = {{ISBN} 3-900051-07-0},\n\
  url = {http://www.R-project.org},\n\
}\n\
\n\
@article{white1989,\n\
  title={Multilayer feedforward networks are universal approximators},\n\
  author={Hornik, Kurt and Stinchcombe, Maxwell and White, Halbert},\n\
  journal={Neural networks},\n\
  volume={2},\n\
  number={5},\n\
  pages={359--366},\n\
  year={1989},\n\
  publisher={Elsevier}\n\
}';
