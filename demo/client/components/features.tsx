/**
 * @description A component that is imported in the the feature container.  It contains the Key Features of the REDIQLESS product.  
 */

import React from "react";

const Features = () => {
	return (
		<div className="flex">
				<div className="w-2/5 px-8 py-6 border-2 border-gray-50">
					<h1 className="text-center mb-4">Key Feature #1</h1>
					<article>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</article>
				</div>
				<div className="flex items-center justify-center w-1/5">
				<img className="h-4/5" src="https://rediqless.s3.us-east-2.amazonaws.com/REDIQLESS_LOGOV1.png">
				</img>
				</div>
				
				<div className="w-2/5 px-8 py-6  border-2 border-gray-50">
				<h1 className="text-center mb-4">Key Feature #2</h1>
					<article>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</article>
				</div>
			</div>
	)
}

export default Features;