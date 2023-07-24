import { FunctionComponent } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { CodeComponentProps } from "../types/actions.types";

const CodeComponent: FunctionComponent<CodeComponentProps> = ({
  code,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit break-words">
      <Highlight theme={themes.oceanicNext} code={code} language="js">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {tokens?.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line?.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeComponent;
