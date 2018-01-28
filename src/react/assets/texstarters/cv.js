export const cvTex = '\\documentclass[12pt, a4paper]{article}\n\
\\usepackage{fullpage}\n\
\\usepackage{graphicx}\n\
\\usepackage{setspace}\n\
\\usepackage[hidelinks]{hyperref}\n\
\\usepackage{amsmath}\n\
\\usepackage{amssymb}\n\
\\usepackage[english]{babel}\n\
\\usepackage[autostyle, english = american]{csquotes}\n\
\\MakeOuterQuote{"}\n\
\\usepackage{parskip}\n\
\\setlength{\\parindent}{0pt}\n\
\\usepackage{enumitem}\n\
\\setlist{leftmargin=4.2cm, align=parleft, labelwidth=3cm, labelsep=0.5in}\n\
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
% To see how to use the bibliography and\n\
% references commands,\n\
% check the Thesis Template\n\
\n\
% BEGIN AND END DOCUMENT SHOULD ALWAYS BE\n\
% AT THE TOP AND BOTTOM OF YOUR TEXT\n\
\\begin{document}\
\\onehalfspacing\n\
\\thispagestyle{empty}\n\
\\enlargethispage{\\baselineskip}\n\
\\vspace*{0.4cm}\n\
\\textbf{\\Large FirstName LastName}\\\\\n\
\\vspace{0.4cm}\n\
\\scriptsize\n\
\n\
\\textbf{Date of Birth:} DD Month YYYY\\\\\n\
\\textbf{Telephone:} +00 1234567890\\\\\n\
\\textbf{Address:}  Street 69, City, Country, Postal Code\\\\\n\
\\textbf{Email:}  user@example.com  (Academic) \\hspace{0.3cm} / \\hspace*{0.3cm} user@personalexample.com (Personal)\n\
\n\
\n\
\\vspace{1cm}\n\
\\begin{itemize}\n\
\n\
\\item[\\textbf{Career Objectives:}]  A few words about yourselves (3-4 lines)\n\
\n\
\\vspace{1cm}\n\
\\item[\\textbf{Education:}]\n\
\\begin{itemize}[ leftmargin=*, label=\\textbullet]\n\
\n\
\\item MSc in Economics, University,\n\
YearStart-YearEnd,\\\\\n\
MSc Thesis Title: "On Nonparametric and Neural Networks techniques for Regression" (Grade: 9.5/10)\\\\\n\
Supervisor: Professor FirstName LastName (Director of Graduate Studies)\\\\\n\
Grade: Excellent (8.5/10)\n\
\n\
\\item BSc in Economics, University,\n\
YearStart-YearEnd,\\\\\n\
Economic Theory and Policy Track\n\
\n\
\\end{itemize}\n\
\n\
\n\
\\vspace{1cm}\n\
\\item[\\textbf{Academic Achievements:}]\n\
\\begin{itemize}[leftmargin=*, label=\\textbullet]\n\
\n\
\\item Scored, during the MSc Economics courses, at the:\\\\\n\
top 10\\% of the class in Econometrics I and II (grades 9.5/10 and 10/10),\\\\ top 12\\% in Microeconomics II (grade 8.5/10) \\\\top 16 \\% in Mathematical Analysis (grade 9.5/10, class mean: 5.54/10)\\\\top 20\\% in Microeconomics I (grade 8/10)\n\
\n\
\\item Scored, during the BSc Economics courses, at the:\\\\\n\
top 10 \\% of the class in Law and Economics \\\\* (grade 10/10, plus best paper presentation grade: 1.9/2)\n\
\n\
\n\
\\end{itemize}\n\
\n\
\n\
\n\
\\vspace{1cm}\n\
\\item[\\textbf{Programming Skills:}]\n\
\\begin{itemize}[leftmargin=*, label=\\textbullet]\n\
\n\
\\item Nodejs(Electron, ReactJS, React Native, Vanilla JS)\\\\\n\
\n\
\\item Python\\\\\n\
\n\
\\item R Programming Language\\\\\n\
Some comments for my MSc Thesis\\\\\n\
(comprised of various non-parametric and neural networks techniques for statistical inference)\n\
\n\
\\item Mathworks MATLAB\\\\\n\
This was the obligatory program used throughout the MSc courses\\\\ (for Econometrics, optimisation problems and Real Business Cycle models)\n\
\n\
\\item Microsoft Excel \\\\(used for data manipulation)\n\
\n\
\\item \\LaTeX \\\\ (used for every piece of my written work)\n\
\n\
\\item IBM SPSS\n\
\n\
\\end{itemize}\n\
\n\
\\vspace{1cm}\n\
\\item[\\textbf{Additional Work History:}]\n\
\\begin{itemize} [leftmargin=*, label=\\textbullet]\n\
\n\
\\item Some comments about work\n\
\n\
\\end{itemize}\n\
\n\
\n\
\\vspace{0.5cm}\n\
\\item[\\textbf{Languages:}]\n\
\\begin{itemize}[leftmargin=*, label=\\textbullet]\n\
\n\
\\item English: Fluent $\\big($University of Cambridge, Certificate of Proficiency in English\\\\ \\hspace*{2.15cm}(C2), 2007$\\big)$\n\
\n\
\\item French: Fluent $\\big($Sorbonne 1er degr\\\'{e} (C1), 2008$\\big)$\n\
\n\
\\item Greek: Native tongue\n\
\n\
\\end{itemize}\n\
\n\
\n\
\n\
\n\
\\vspace{1cm}\n\
\\item[\\textbf{References:}]\n\
Academic references can be made available upon request.\n\
\n\
\n\
\\end{itemize}\n\
\n\
\n\
\n\
\\end{document}';

export const cvBib = '';
