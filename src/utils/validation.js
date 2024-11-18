export function showError(element, message) {
    $(element).addClass('is-invalid')
      .siblings('.invalid-feedback')
      .text(message);
  }
  
  export function clearError(element) {
    $(element).removeClass('is-invalid');
  }
  
  export function showAlert(type, message, formId) {
    $('<div>')
      .addClass(`alert alert-${type} alert-dismissible fade show`)
      .attr('role', 'alert')
      .html(`
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `)
      .insertBefore(formId);
  }