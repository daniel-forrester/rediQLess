/**
 * @description A component that is imported in the the feature container.  It contains the Key Features of the REDIQLESS product.  
 */

 import React from "react";

 //Features is a component in the features container that houses the two small articles and RediQLess logo that the user sees right under the nav bar
 const Features = () => {
	 return (
		 <div className="
		 flex
		 xs:flex-col
		 xs:justify-center
		 md:flex-col 
		 md:items-center 
		 md:justify-center
		 
		 md:ml-auto
		 md:mr-auto">
				 <div className="
				 transform transition duration-500 
				 hover:scale-110 
				 text-darkblue-default 
				 sm:text-deeppink-default
				 w-2/5 
				 px-8 py-6 
				 border-2 bg-white-default border-yellow-newYellow  shadow-2xl rounded-lg
				 xs:w-3/4
				 md:flex-col
				 md:w-auto
				 md:text-center
				 ">
					 <h1 className="
					 text-center
					 mb-4 
					 italic text-xl text-semibold
					 
					 md:text-bold
					 ">Complex Caching...</h1>
					 <article className="
					 md:text-base
					 ">One part Redis, one part GraphQL, this is RediQLess - a caching tool for APIs. Utilizing GraphQL’s efficient and elegant querying language and Redis’ lightweight caching, we've leveraged these two features to generate a cache of API results. Built for developers, by developers, to facilitate lightweight and performant applications.</article>
				 </div>
 
				 <div className="
				 flex items-center justify-center 
				 w-1/5 
				 md:flex-col">
				 <img className="
				 h-4/5 
				 transform transition duration-500 
				 hover:animate-pulse 
				 w-{277px}
				 xs:w-3/4
				 md:w-{400px}
				 md:mt-5
				 md:mb-5" 
				 src="https://rediqlessprod.s3.us-east-2.amazonaws.com/REDIQLESS-LOGO-CLEAN.png"></img>
				 </div>
				 
				 <div className="
				 transform transition duration-500 
				 hover:scale-110 
				 text-darkblue-default  
				 w-2/5 px-8 py-4 
				 bg-white-default 
				 border-2 border-yellow-newYellow  shadow-2xl rounded-lg
				 xs:w-3/4 
				 md:flex-col
				 md:w-auto
				 md:text-center
				 ">
				 <h1 className="
				 text-center 
				 mb-4 
				 font-medium italic text-xl 
				 md:text-lg
				 ">...Made Simple!</h1>
					 <article className="
					 md:text-base
					 ">Leveraging GraphQL’s declarative query language and strongly typed API with Redis’ inimitable caching mechanism, RediQLess caches unique calls to third-party APIs for ultimate comportability and maximum reusability. RediQLess’ cache functions as a replacement for the API, which can be memory-intensive on the client and server side.
 </article>
				 </div>
			 </div>
	 )
 }
 
 export default Features;
