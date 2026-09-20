export default function UrlForm({ url, onUrlChange, onSubmit, loading = false }) {
  return (
    <form className="validator-form" onSubmit={onSubmit} aria-describedby="url-help">
      <label htmlFor="url">URL to inspect</label>
      <div className="input-row">
        <input
          id="url"
          name="url"
          type="text"
          required
          maxLength={2048}
          value={url}
          onChange={event => onUrlChange(event.target.value)}
          placeholder="https://example.com/path"
          autoComplete="url"
          spellCheck="false"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !url.trim()}>
          {loading ? 'Checking…' : 'Run DFA'}
        </button>
      </div>
      <p id="url-help" className="field-help">
        Enter one lowercase HTTP or HTTPS URL. The simulator reads the text and never visits it.
      </p>
    </form>
  );
}
