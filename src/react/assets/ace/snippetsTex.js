ace.define("ace/snippets/tex",["require","exports","module"],function(e,t,n){"use strict";t.snippetText="\
\nsnippet $\n	$\n		${1}\n	$\n\
\nsnippet $$\n	$$\n		${1}\n	$$\n\
\nsnippet \\a\n	alpha\n\
\nsnippet \\aleph\n	aleph\n\
\nsnippet \\align\n	begin{align}\n		${1}\n	\\end{align}\n\
\nsnippet \\approximates\n	approx\n\
\nsnippet \\arccos\n	arccos\n\
\nsnippet \\arcsin\n	arcsin\n\
\nsnippet \\arctan\n	arctan\n\
\nsnippet \\arg\n	arg\n\
\nsnippet \\argmax\n	arg\\max_{${1:n}}\n\
\nsnippet \\argmin\n	arg\\min_{${1:n}}\n\
\nsnippet \\asymptotically-equivalent\n	asymp\n\
\nsnippet \\b\n	beta\n\
\nsnippet \\backslash\n	backslash\n\
\nsnippet \\ball\n	mathit{B}_{${1:n}}(${2:n})\n\
\nsnippet \\begin\n	begin{${1:env}}\n		${2}\n	\\end{$1}\n\
\nsnippet \\belongs\n	in\n\
\nsnippet \\big-braces\n	left\\lbrace ${1:n} \\right\\rbrace\n\
\nsnippet \\big-parentheses\n	left( ${1:n} \\right)\n\
\nsnippet \\big-brackets\n	left[ ${1:n} \\right]\n\
\nsnippet \\big-absolute\n	left| ${1:n} \\right|\n\
\nsnippet \\bigcap\n	bigcap\n\
\nsnippet \\bigcup\n bigcup\n\
\nsnippet \\bigcirc\n	bigcirc\n\
\nsnippet \\bigodot\n	bigcodot\n\
\nsnippet \\bigoplus\n	bigoplus\n\
\nsnippet \\bigotimes\n	bigotimes\n\
\nsnippet \\bigtriangledown\n	bigtriangledown\n\
\nsnippet \\bigtriangleup\n	bigtriangleup\n\
\nsnippet \\bigsqcup\n	bigsqcup\n\
\nsnippet \\biguplus\n	biguplus\n\
\nsnippet \\bigvee\n	bigvee\n\
\nsnippet \\bigwedge\n	bigwedge\n\
\nsnippet \\bold\n	textbf{${1:text}}\n\
\nsnippet \\bullet\n	bullet\n\
\nsnippet \\big(\n	big( ${1:n} \\big)\n\
\nsnippet \\Big(\n	Big( ${1:n} \\Big)\n\
\nsnippet \\bigg(\n	bigg( ${1:n} \\bigg)\n\
\nsnippet \\Bigg(\n	Bigg( ${1:n} \\Bigg)\n\
\nsnippet \\big[\n	big[ ${1:n} \\big]\n\
\nsnippet \\Big[\n	Big[ ${1:n} \\Big]\n\
\nsnippet \\bigg[\n	bigg[ ${1:n} \\bigg]\n\
\nsnippet \\Bigg[\n	Bigg[ ${1:n} \\Bigg]\n\
\nsnippet \\big\\lbrace\n	big\\lbrace ${1:n} \\big\\rbrace\n\
\nsnippet \\Big\\lbrace\n	Big\\lbrace ${1:n} \\Big\\rbrace\n\
\nsnippet \\bigg\\lbrace\n	bigg\\lbrace ${1:n} \\bigg\\rbrace\n\
\nsnippet \\Bigg\\lbrace\n	Bigg\\lbrace ${1:n} \\Bigg\\rbrace\n\
\nsnippet \\binomial\n	binom{${1:n}}{${2:n}}\n\
\nsnippet \\braces\n	\\{${1:n}\\}\n\
\nsnippet \\newcommand\n	newcommand{\\${1:cmd}}[${2:opt}]{${3:realcmd}}${4}\n\
\nsnippet \\usepackage\n	usepackage[${1:[options}]{${2:package}}\n\
\nsnippet \\newunicodechar\n	newunicodechar{${1}}{${2:\\ensuremath}${3:tex-substitute}}}\n\
\nsnippet \\declare\n	DeclareMathOperator{${1}}{${2}}\n\
\nsnippet \\tabular\n	begin{tabular}{${1:c}}\n	${2}\n	\\end{tabular}\n\
\nsnippet \\theorem\n	begin[${1:author}]{theorem}\n	${3}\n	\\end{theorem}\n\
\nsnippet \\center\n	begin{center}\n		${1}\n	\\end{center}\n\
\nsnippet \\gather\n	begin{gather}\n		${1}\n	\\end{gather}\n\
\nsnippet \\equation-numbered\n	begin{equation}\n		${1}\n	\\end{equation}\n\
\nsnippet \\equation-unnumbered\n	begin{equation*}\n		${1}\n	\\end{equation*}\n\
\nsnippet \\enumerate\n	begin{enumerate}\n		\\item ${1}\n	\\end{enumerate}\n\
\nsnippet \\list-numbered\n	begin{enumerate}\n		\\item ${1}\n	\\end{enumerate}\n\
\nsnippet \\itemize\n	begin{itemize}\n		\\item ${1}\n	\\end{itemize}\n\
\nsnippet \\list-bullets\n	begin{itemize}\n		\\item ${1}\n	\\end{itemize}\n\
\nsnippet \\description\n	begin{description}\n		\\item[${1}] ${2}\n	\\end{description}\n\
\nsnippet \\matrix-parentheses\n	begin{pmatrix}\n		${2}\n	\\end{pmatrix}\n\
\nsnippet \\matrix-brackets\n	begin{bmatrix}\n		${2}\n	\\end{bmatrix}\n\
\nsnippet \\matrix-braces\n	begin{Bmatrix}\n		${2}\n	\\end{Bmatrix}\n\
\nsnippet \\matrix-small\n	begin{smallmatrix}\n		${2}\n	\\end{smallmatrix}\n\
\nsnippet \\matrix\n	begin{matrix}\n		${2}\n	\\end{matrix}\n\
\nsnippet \\cases\n	begin{cases}\n		${1:equation} &\\text{ if }${2:case}\n	\\end{cases}\n\
\nsnippet \\split\n	begin{split}\n		${1}\n	\\end{split}\n\
\nsnippet \\part\n	part{${1:part name}} % (fold)\n	\\label{prt:${2:$1}}\n	${3}\n	% part $2 (end)\n\
\nsnippet \\chapter\n	chapter{${1:chapter name}}\n	\\label{cha:${2:$1}}\n	${3}\n\
\nsnippet \\section\n	section{${1:section name}}\n	\\label{sec:${2:$1}}\n	${3}\n\
\nsnippet \\subsection\n	subsection{${1:subsection name}}\n	\\label{sub:${2:$1}}\n	${3}\n\
\nsnippet \\subsubsection\n	subsubsection{${1:subsubsection name}}\n	\\label{ssub:${2:$1}}\n	${3}\n\
\nsnippet \\paragraph\n	paragraph{${1:paragraph name}}\n	\\label{par:${2:$1}}\n	${3}\n\
\nsnippet \\subparagraph\n	subparagraph{${1:subparagraph name}}\n	\\label{subp:${2:$1}}\n	${3}\n\
\nsnippet \\itemdescription\n	item[${1:description}] ${2:item}\n\
\nsnippet \\figure\n	begin{figure}\n	\\begin{center}\n	    \\includegraphics[scale=${1}]{Plots/${2}}\n	\\end{center}\n	\\caption{${3}}\n	\\label{fig:${4}}\n	\\end{figure}\n\
\nsnippet \\cite\n	cite[${1}]{${2}}${3}\n\
\nsnippet \\cite-textual\n	citet{${1}}\n\
\nsnippet \\cite-parenthesis\n	citep{${1}}\n\
\nsnippet \\cite-footnote\n	footcite[${1}]{${2}}${3}\n\
\nsnippet \\italics\n	textit{${1:text}}\n\
\nsnippet \\underline\n	underline{${1:text}}\n\
\nsnippet \\emphasize\n	emph{${1:text}}\n\
\nsnippet \\textsc\n	textsc{${1:text}}\n\
\nsnippet \\text-sans\n	textsf{${1:text}}\n\
\nsnippet \\text-roman\n	textrm{${1:text}}\n\
\nsnippet \\text-teletype\n	texttt{${1:text}}\n\
\nsnippet \\footnote\n	footnote{${1:text}}\n\
\nsnippet \\stackrel\n	stackrel{${1:above}}{${2:below}} ${3}\n\
\nsnippet \\fraction\n	frac{${1:num}}{${2:denom}}\n\
\nsnippet \\fraction-derivative\n	frac{d ${1:f}}{d ${2:x}}\n\
\nsnippet \\fraction-derivative-caligraphy\n	frac{\\partial ${1:f}}{\\partial ${2:x}}\n\
\nsnippet \\sum\n	sum^{${1:n}}_{${2:i=1}}{${3}}\n\
\nsnippet \\integral\n	int^{${1:n}}_{${2:i=1}}{${3}}\n\
\nsnippet \\integral-curve\n	oint_{\\gamma}${1}\n\
\nsnippet \\integral-surface\n	iint_{\\mathit{F}}${1}\n\
\nsnippet \\integral-volume\n	iiint_{\\mathit{V}}${1}\n\
\nsnippet \\infinity\n	infty\n\
\nsnippet \\left\\lbrace\n	left\\lbrace ${1:n} \\right\\rbrace\n\
\nsnippet \\left(\n	left( ${1:n} \\right)\n\
\nsnippet \\left[\n	left[ ${1:n} \\right]\n\
\nsnippet \\left|\n	left| ${1:n} \\right|\n\
\nsnippet \\left| noright\n	left|_{${2:i=1}} ${1:n} \\right.\n\
\nsnippet \\evaluated-left\n	left|_{${2:i=1}} ${1:n} \\right.\n\
\nsnippet \\left| onlyright\n	left.mx ${1:n} \\right|_{${2:i=1}}\n\
\nsnippet \\evaluated-right\n	left.mx ${1:n} \\right|_{${2:i=1}}\n\
\nsnippet \\gamma\n	gamma\n\
\nsnippet \\GAMMA\n	Gamma\n\
\nsnippet \\delta\n	delta\n\
\nsnippet \\DELTA\n	Delta\n\
\nsnippet \\epsilon\n	epsilon\n\
\nsnippet \\epsilon-pretty\n	varepsilon\n\
\nsnippet \\zeta\n	zeta\n\
\nsnippet \\eta\n	eta\n\
\nsnippet \\theta\n	theta\n\
\nsnippet \\THETA\n	Theta\n\
\nsnippet \\vartheta\n	vartheta\n\
\nsnippet \\lambda\n	lambda\n\
\nsnippet \\LAMBDA\n	Lambda\n\
\nsnippet \\mu\n	mu\n\
\nsnippet \\xi\n	xi\n\
\nsnippet \\XI\n	Xi\n\
\nsnippet \\chi\n	chi\n\
\nsnippet \\omega\n	omega\n\
\nsnippet \\OMEGA\n	Omega\n\
\nsnippet \\rho\n	rho\n\
\nsnippet \\pi\n	pi\n\
\nsnippet \\PI\n	Pi\n\
\nsnippet \\prod\n prod\n\
\nsnippet \\sigma\n	sigma\n\
\nsnippet \\SIGMA\n	Sigma\n\
\nsnippet \\tau\n	tau\n\
\nsnippet \\phi\n	phi\n\
\nsnippet \\PHI\n	Phi\n\
\nsnippet \\norm\n	| ${1:n} \\|\n\
\nsnippet \\excluding\n	backslash\n\
\nsnippet \\intersection\n	cap\n\
\nsnippet \\intersection-big\n	bigcap\n\
\nsnippet \\union\n	cup\n\
\nsnippet \\union-big\n	bigcup\n\
\nsnippet \\hadamard\n	bigcodot\n\
\nsnippet \\kroneker\n	bigotimes\n\
\nsnippet \\gradient\n	nabla\n\
\nsnippet \\deltadifference\n	bigtriangleup\n\
\nsnippet \\modulus\n	bmod\n\
\nsnippet \\orthogonal\n	bot\n\
\nsnippet \\dots\n	ldots\n\
\nsnippet \\dots-center\n	cdots\n\
\nsnippet \\dots-diagonal\n	ddots\n\
\nsnippet \\dots-vertical\n	vdots\n\
\nsnippet \\leftarrow\n	leftarrow\n\
\nsnippet \\Leftarrow\n	Leftarrow\n\
\nsnippet \\rightarrow\n	rightarrow\n\
\nsnippet \\Rightarrow\n	Rightarrow\n\
\nsnippet \\leftrightarrow\n	leftrightarrow\n\
\nsnippet \\Leftrightarrow\n	Leftrightarrow\n\
\nsnippet \\longleftarrow\n	longleftarrow\n\
\nsnippet \\Longleftarrow\n	Longleftarrow\n\
\nsnippet \\longrightarrow\n	longrightarrow\n\
\nsnippet \\Longrightarrow\n	Longrightarrow\n\
\nsnippet \\longleftrightarrow\n	longleftrightarrow\n\
\nsnippet \\Longleftrightarrow\n	Longleftrightarrow\n\
\nsnippet \\lower-or-equal\n	leq\n\
\nsnippet \\dominated\n	prec\n\
\nsnippet \\dominated-or-indifferent\n	preceq\n\
\nsnippet \\much-lower\n	ll\n\
\nsnippet \\subset-proper\n	subset\n\
\nsnippet \\subset\n	subseteq\n\
\nsnippet \\in\n	in\n\
\nsnippet \\not-equal\n	neq\n\
\nsnippet \\indifferent\n	sim\n\
\nsnippet \\similar\n sim\n\
\nsnippet \\similar-or-equal\n	simeq\n\
\nsnippet \\greater-or-equal\n	geq\n\
\nsnippet \\dominates\n	succ\n\
\nsnippet \\prefered\n	succ\n\
\nsnippet \\dominates-or-equal\n	succeq\n\
\nsnippet \\prefered-or-equal\n	succeq\n\
\nsnippet \\much-greater\n	gg\n\
\nsnippet \\superset-proper\n	supset\n\
\nsnippet \\superset\n	supseteq\n\
\nsnippet \\plus-minus\n	pm\n\
\nsnippet \\minus-plus\n	mp\n\
\nsnippet \\product\n	\\times\n\
\nsnippet \\division\n	div\n\
\nsnippet \\lbrace\n	lbrace ${1:n} \\rbrace\n\
\nsnippet \\clearpage \n	clearpage\n\
\nsnippet \\newpage\n	newpage\n\
\nsnippet \\root-square\n	sqrt{${1:n}}\n\
\nsnippet \\root-general\n	sqrt[${1:base}]{${2:n}}\n\
\nsnippet \\math-boldlines\n	mathbb{${1:base}}\n\
\nsnippet \\math-italics\n	mathit{${1:base}}\n\
\nsnippet \\math-caligraphy\n	mathcal{${1:base}}\n\
\nsnippet \\math-boldface\n	mathbf{${1:base}}\n\
\nsnippet \\math-sans\n	mathsf{${1:base}}\n\
\nsnippet \\math-teletype\n	mathtt{${1:base}}\n\
\nsnippet \\limit\n	lim_{${1:base}\\longrightarrow\\infty}\n\
\nsnippet \\product-scalar\n	langle ${1:n}, ${2:n} \\rangle\n\
\nsnippet \\langle\n	langle ${1:n}, ${2:n} \\rangle\n\
\nsnippet \\text\n	text{ ${1:n} }\n\
\nsnippet \\overline\n	overline{${1:n}}\n\
\nsnippet \\overbrace\n	overbrace{${2:n}}^{${1:over}}\n\
\nsnippet \\underbrace\n	underbrace{${2:n}}_{${1:under}}\n\
\nsnippet \\tilde\n	tilde{${1:n}}\n\
\nsnippet \\hat\n	hat{${1:n}}\n\
\nsnippet \\log\n	log(${1:n})\n\
\nsnippet \\dot\n	bullet\n\
\nsnippet \\normal-distribution\n	mathcal{N}(0,1)\n\
\nsnippet \\expectation\n	mathbb{E}_{${1:n}}\n\
\nsnippet \\real\n	mathbb{R}^{${1:n}}\n\
\nsnippet \\complex\n	mathbb{C}\n\
\nsnippet \\natural\n	mathbb{N}\n\
\nsnippet \\rational\n	mathbb{Q}\n\
\nsnippet \\derivative-differential-first\n	dot{${1:f}}\n\
\nsnippet \\derivative-differential-second\n	ddot{${1:f}}\n\
\nsnippet \\proportional\n	propto\n\
",t.scope="tex"})
