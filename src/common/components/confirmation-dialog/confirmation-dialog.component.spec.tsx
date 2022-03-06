import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('Confirmation-dialog component specs', () => {
  it('View dialog component with title and text', () => {
    // Arrange
    interface LabelProps {
      closeButton: string;
      acceptButton: string;
    }

    interface Props {
      isOpen: boolean;
      onAccept: () => void;
      onClose: () => void;
      title: string | React.ReactNode;
      labels: LabelProps;
    }

    const labelProps: LabelProps = {
      closeButton: 'Close',
      acceptButton: 'Accept',
    };

    const dialoProps: Props = {
      isOpen: true,
      onAccept: () => void {},
      onClose: () => void {},
      title: 'Prueba title dialog',
      labels: labelProps,
    };

    // Act
    render(
      <ConfirmationDialogComponent {...dialoProps}>
        Prueba cuerpo dialog
      </ConfirmationDialogComponent>
    );

    // Assert
    const dialogElement = screen.getByRole('dialog');
    const titleElement = screen.getByRole('heading', {
      level: 2,
      name: 'Prueba title dialog',
    });
    const bodyElement = screen.getByText('Prueba cuerpo dialog');
    const buttonClose = screen.getByText('Close');
    const buttonAccept = screen.getByText('Accept');

    expect(dialogElement).not.toBeNull();
    expect(dialogElement.tagName).toEqual('DIV');
    expect(dialogElement).toBeInTheDocument();

    //titulo
    expect(titleElement).toBeInTheDocument();
    // body
    expect(bodyElement).toBeInTheDocument();

    // buttons
    expect(buttonClose).toBeInTheDocument();
    expect(buttonAccept).toBeInTheDocument();
  });
});
