import CodeSnippet from "@/components/mdx/CodeSnippet";
import type { MDXComponents } from "mdx/types";
import { ImageProps } from "next/image";
import MDXImage from "@/components/mdx/Image";
import LinkHeading from "@/components/mdx/LinkHeading";
import { Carousel, CarouselProps } from "@/components/mdx/Carousel";

function createCodeBlock(props: any) {
    // For pre tags that contain code blocks
    if (props.children && props.children.props && props.children.props.className) {
        const { className, children } = props.children.props;

        // Extract language from className (format: language-xxx)
        const language = className.replace('language-', '');
        const label = language.charAt(0).toUpperCase() + language.slice(1);

        return (
            <CodeSnippet
                code={children}
                language={language as any}
            />
        );
    }

    // Fallback for other pre tags or empty code blocks
    return <pre {...props} />;
}

function createHeading(as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
    return ({ children, ...props }: React.PropsWithChildren) => {
        return (
            <LinkHeading as={as} {...props}>
                {children}
            </LinkHeading>
        );
    }
}

const components = {
    h2: createHeading('h2'),
    h3: createHeading('h3'),
    p: ({ children }) => (<p className="mt-2 mb-3 leading-[175%]">{children}</p>),
    ul: ({ children }) => (<ul className="list-disc m-0 pl-5">{children}</ul>),
    li: ({ children }) => (<li className="p-0 pl-2 mb-3 marker:text-blue-400">{children}</li>),
    Image: ({ src, alt, ...props }: ImageProps) => (<MDXImage src={src} alt={alt} {...props} />),
    Carousel: ({ images, ...props }: CarouselProps) => (
        <Carousel images={images} {...props} />
    ),
    pre: createCodeBlock as any,

} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
    return components;
}