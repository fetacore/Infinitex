export const presentationTex = '\\documentclass{beamer}\n\
\\usepackage[hidelinks]{hyperref}\n\
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
\\title{Title of Presentation}\n\
\\author{FirstName LastName}\n\
\\institute{University}\n\
\\date{DD/MM/YYYY}\n\
\\frame{\\titlepage}\n\
\n\
\\begin{frame}\n\
\\begin{itemize}\n\
\\item Item 1\n\
\\item Item 2\n\
\\item Unlike Parametric models, Neural Networks can be thought of as a Non-Parametric technique despite the fact that they impose a model on the data. \
The weights that we estimate are derived from the infinite dimensional space, and they change as the network is trained.\n\
\\item The context in which neural networks were born is human biology, since they were an effort to describe \
in a mathematical sense the operation of the human brain and its ability to recognize patterns and perform interpolation and extrapolation.\n\
\\end{itemize}\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
\\frametitle{This is a graphical representation of a Neural Network}\n\
%\\begin{center}\n\
%\\includegraphics[scale=0.5]{neural_network.png}\n\
%\\end{center}\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
\\frametitle{Mathematical Expression}\n\
$$y_i \\approx \\hat{m}(x_i)=\\underbrace{\\mathcal{G} \\left[\\sum_{j} \\tilde{w}_{j} \\underbrace{\\mathcal{S}\\Big(\\sum_{i}w_{ij} x_i + b_j \\Big)\
}_\\text{$j$\'th hidden unit value} + \\tilde{b} \\right]}_\\text{$i$\'th output neuron} $$\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
\\begin{itemize}\n\
\\item $j$ is the number of hidden units in the hidden layer\n\
\\item $i$ indicates the input\'s subscript\n\
\\item $w _{ij}$ denotes the assigned weights corresponding to the input unit and the hidden units. \
Their dimensions are $\\#$ of inputs$\\times \\#$ of hidden units.\n\
\\item $b_j$ denotes the bias term corresponding to each hidden unit. The dimensions are $1 \\times \\#$ of hidden units. \
It can be thought as the intercept, i.e. the weights assigned to each element of the vector of ones as regressors.\n\
\\item $\\mathcal{S}$ denotes the activation function, which is almost always a sigmoidal function.\n\
\\item $\\tilde{w}_{j}$ denotes the weights assigned to the output of the $j$\'th neuron so that it passes from the activation function of the output neuron.\n\
\\item $\\tilde{b}$ is the bias of the output of the hidden unit.\n\
\\item $\\mathcal{G}$ is the activation function of the output neuron, which is a linear function in the literature.\n\
\\end{itemize}\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
Suppose we want to regress $$Y=\\begin{bmatrix}\n\
Y_1 \\\\ Y_2 \\\\ \\vdots \\\\ Y_T\n\
\\end{bmatrix}$$ on $$X=\\begin{bmatrix}\n\
x_{11} & x_{12} & \\ldots & x_{1N} \\\\\n\
x_{21} & x_{22} & \\ldots & x_{2N}\\\\\n\
\\vdots & \\vdots & \\ddots & \\vdots\\\\\n\
x_{T1} & x_{T2} & \\ldots & x_{TN}\\\\\n\
\\end{bmatrix}$$\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
\\begin{itemize}\n\
\\item If $\\mathcal{S}$ is the Logistic function then\n\
$$\n\
\\mathcal{S}\\left\\lbrace \\sum_{i} w_{ij} + x_i + b_j \\right\\rbrace = \\frac{1}{1+exp \\left(-( \\sum_{i} w_{ij} + x_i + b_j ) \\right)}\n\
$$\n\
\\item Then we apply this operation for all the units of the hidden layer and assign corresponding weights:\n\
$$\\left[\\sum_{j} \\tilde{w}_{j} \\mathcal{S}\\Big (\\sum_{i}w_{ij} x_i + b_j \\Big)+ \\tilde{b} \\right]$$\n\
\\item Last we impose the output layer activation, which will be a linear function, therefore the equation remain as in the previous step.\n\
\\end{itemize}\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
\\frametitle{How do we train the network}\n\
\\begin{itemize}\n\
\\item We initialize the algorithm with random weights (not in a Bayesian sense unless the hidden units are more than our actual data points).\n\
\n\
\\item In the regression environment we train with supervision, i.e. we already have the responses $Y$, which we did not use until now, therefore we have some values that we want our function to achieve.\n\
\n\
\\item We use the so-called Back-propagation algorithm.\n\
\\end{itemize}\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
\\frametitle{The Back-Propagation Algorithm}\n\
\\begin{itemize}\n\
\\item We need a loss function, which can be the $L_2$ loss.\n\
\n\
\\item By use of the chain rule, we differentiate wrt the weights and the biases.\n\
\n\
\\item We then use the Gradient Descent method in order to update the weights and the biases, which is essentially the Newton method, but we interpolate a value for the inverse Hessian, say $\\eta = 0.005$.\n\
\n\
\\item After that we do the same procedure as before with the updated weights and measure the loss.\n\
\n\
\\item We repeat this procedure until the loss is of a satisfying order.\n\
\\end{itemize}\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
\\frametitle{Why do they work}\n\
\\begin{theorem}\n\
(Cybenko,1989)\n\
Let $\\mathcal{S}$ be any continuous \\textit{sigmoidal} function, $x \\in \\mathbb{R}^n$ and $w_j \\in \\mathbb{R}^n$. Then functions of the form\n\
$$G(x) = \\sum_{j=1}^{J} \\tilde{w}_j \\mathcal{S}\\left\\lbrace  w\'_{j} x+ b_j \\right\\rbrace$$ are dense\\footnote{\n\
A set $A$ which is a subset of a topological space $X$ is termed dense in $X$ if $\\forall x \\in X$ it is true that $x \\in A$ or $x$ is a limit point of $A$. A limit point of a set $A \\subset X$ is some $x \\in X$ that has the property that $\\left(O_d(x,\\varepsilon) \\cap A\\right) \\neq \\varnothing$ for any $\\varepsilon > 0$ and the point of intersection is not $x$ itself.\n\
} \n\
in the space of continuous functions on the $n$-dimensional unit cube $[0,1]^n$, i.e. given any function $f \\in \\mathcal{C}(I_n)$ and $\\varepsilon > 0$, there is a function of the above form for which, $\\forall x \\in I_n$,\n\
$$ |G(x) - f(x)| < \\varepsilon$$\n\
\\end{theorem}\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
\\frametitle{Advancements}\n\
\\begin{itemize}\n\
\\item There are procedures that are recurrent, meaning that the connection between the layers may not be serial but rather parallel or cycloid. Recent papers have proved that this type of networks are, as well as the feedforward ones, universal approximators of arbitrary structures.\n\
\n\
\\item Bayesian techniques help the speed of convergence, in the sense that if we have a prior belief about the distribution of the weights and biases then we can start their values with random sampling from a specific distribution rather than a uniform which is the default.\n\
\\end{itemize}\n\
\\end{frame}\n\
\n\
\\begin{frame}\n\
\\frametitle{Drawbacks/Shortcomings}\n\
\\begin{itemize}\n\
\\item This method, while extremely effective, and proven by measure theory to be effective, it is not fully automated. Every problem that the network tries to solve requires different numbers of hidden layers and hidden units in it, as well as different $\\eta$. There is no automatic procedure that can set these values correctly.\n\
\n\
\\item The human brain can take the training from one problem and implement the results into another and realize the causal relation between the two (or more) procedures and get good results. There is no way that we can import the learning of one network into another and get good results as they are. Even causality has not yet been definitively proven as a mathematical condition.\n\
\n\
\\item If these problems are solved then then we will be able to talk about true artificial general intelligence.\n\
\\end{itemize}\n\
\\end{frame}\n\
\n\
\\end{document}'

export const presentationBib = ''
