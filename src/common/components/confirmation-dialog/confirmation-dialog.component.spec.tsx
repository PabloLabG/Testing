import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { useConfirmationDialog } from './confirmation-dialog.hook';

import userEvent from '@testing-library/user-event';

describe('Confirmation-dialog component specs', () => {
  it('View dialog component with title and text', () => {
    // Arrange
    const dialoProps = {
      isOpen: true,
      onAccept: () => void {},
      onClose: () => void {},
      title: 'Prueba title dialog',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };

    // Act
    const { asFragment } = render(
      <ConfirmationDialogComponent {...dialoProps}>
        Prueba cuerpo dialog
      </ConfirmationDialogComponent>
    );

    const dialogElement = screen.getByRole('dialog');
    const titleElement = screen.getByRole('heading', {
      level: 2,
      name: dialoProps.title,
    });
    const bodyElement = screen.getByText('Prueba cuerpo dialog');
    const buttonClose = screen.getByText(dialoProps.labels.closeButton);
    const buttonAccept = screen.getByText(dialoProps.labels.acceptButton);

    // Assert
    expect(asFragment()).toMatchSnapshot();
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

  it('View dialog component click in close', () => {
    // Arrange
    const dialoProps = {
      isOpen: true,
      onAccept: () => void {},
      onClose: jest.fn(),
      title: 'Prueba title dialog',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };

    // Act
    render(
      <>
        <ConfirmationDialogComponent {...dialoProps}>
          Prueba cuerpo dialog
        </ConfirmationDialogComponent>
      </>
    );

    const dialogElement = screen.getByRole('heading', {
      name: dialoProps.title,
    });
    const buttonClose = screen.getByRole('button', {
      name: dialoProps.labels.closeButton,
    });

    // buttons Click
    userEvent.click(buttonClose);

    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(dialoProps.onClose).toHaveBeenCalled();
  });

  it('View dialog component click in accept', () => {
    // Arrange
    const dialoProps = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: () => void {},
      title: 'Prueba title dialog',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };

    // Act
    render(
      <>
        <ConfirmationDialogComponent {...dialoProps}>
          Prueba cuerpo dialog
        </ConfirmationDialogComponent>
      </>
    );

    const dialogElement = screen.getByText(dialoProps.title);
    const buttonAccept = screen.getByRole('button', {
      name: dialoProps.labels.acceptButton,
    });

    // buttons Click
    userEvent.click(buttonAccept);

    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(dialoProps.onAccept).toHaveBeenCalled();
  });

  it('View dialog component not visible', () => {
    // Arrange
    const dialoProps = {
      isOpen: false,
      onAccept: () => void {},
      onClose: () => void {},
      title: 'Prueba title dialog',
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
    };

    // Act
    render(
      <>
        <ConfirmationDialogComponent {...dialoProps}>
          Prueba cuerpo dialog
        </ConfirmationDialogComponent>
      </>
    );

    // screen.debug();
    const dialogElement = screen.queryByRole('dialog');

    // Assert
    expect(dialogElement).not.toBeInTheDocument();
  });
});
