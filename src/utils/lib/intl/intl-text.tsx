import type { ComponentProps, ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

type IntlTextValues = ComponentProps<typeof FormattedMessage>['values'];

interface IntlTextProps {
  html?: boolean;
  id?: string;
  path: MessagePath;
  values?: IntlTextValues;
}

const VALUES: IntlTextValues = {
  br: () => <br />,
  span: (chunks) => <span>{chunks}</span>
};

const toHtml = (chunks: ReactNode[]) => chunks.join('');

export const IntlText = ({ html, id, path, values }: IntlTextProps) => {
  const mergedValues = { ...VALUES, ...values };

  if (html) {
    return (
      <FormattedMessage id={path} values={mergedValues}>
        {(chunks) => <span dangerouslySetInnerHTML={{ __html: toHtml(chunks) }} id={id} />}
      </FormattedMessage>
    );
  }

  return <FormattedMessage id={path} values={mergedValues} />;
};
