<?php

namespace App\Exceptions;

use Exception;

class JsonResponseExceptionHandler extends Exception
{
    /**
     * @var ExceptionHandlerInterface|null
     */
    private $previous;

    public function __construct($previous = null)
    {
        $this->previous = $previous;
    }

    public function report(Exception $exception)
    {
        $this->previous === null ?: $this->previous->report($exception);
    }

    public function render($request, Exception $exception)
    {
        if ($exception instanceof ExceptionHandlerInterface) {
            $response = $this->previous === null ? null : $this->previous->render($request, $exception);
        }

        if(!($this->previous instanceof FatalThrowableError)) {
            return $this->previous;
        }

        return $response;
    }

    /**
     * {@inheritdoc}
     */
    public function renderForConsole($output, Exception $exception)
    {
        /* @var OutputInterface $output */
        $this->previous === null ?: $this->previous->renderForConsole($output, $exception);
    }
}