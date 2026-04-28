import { useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { bankOptions, cnaeOptions, documentReviewStatusMap, noticeOptions, stageContent, uploadChecklist } from '../../data/constants'
import { AppFooter } from '../shared/AppBrand'
import { PainelNavbar } from './PainelNavbar'
import { SidebarStatus } from './SidebarStatus'

function FormSection({ title, children }) {
  return (
    <Card className="form-section-card">
      <Card.Body className="p-0">
        <div className="form-section-card__header">
        </div>
        <div className="form-section-card__content">{children}</div>
      </Card.Body>
    </Card>
  )
}

function UploadItemCard({ item, uploadedFileName, onChange }) {
  const [showInfo, setShowInfo] = useState(false)
  const statusMeta = documentReviewStatusMap[item.reviewStatus] || documentReviewStatusMap['not-sent']

  return (
    <div className="upload-item">
      <div className="upload-item__head">
        <div className="upload-item__title-wrap">
          <strong>{item.label}</strong>
          <button
            type="button"
            className="upload-info-button"
            onClick={() => setShowInfo((current) => !current)}
            aria-label={`Explicar o item ${item.label}`}
          >
            <i className="bi bi-info-circle" />
          </button>
        </div>
        <span className={`upload-status-chip upload-status-chip--${statusMeta.tone}`}>
          <i className={`bi ${statusMeta.icon}`} />
          <span>{statusMeta.label}</span>
        </span>
      </div>

      {showInfo && <div className="upload-item__info">{item.info}</div>}

      <Form.Control key={uploadedFileName || `${item.key}-empty`} type="file" onChange={(event) => onChange(event.target.files?.[0]?.name || '')} />
      {uploadedFileName && (
        <div className="upload-item__footer">
          <small>{uploadedFileName}</small>
          <button type="button" className="upload-remove-button" onClick={() => onChange('')}>
            Remover anexo
          </button>
        </div>
      )}
    </div>
  )
}

function StageFooterActions({ onBack, onSave, saveDisabled, backLabel = 'Cancelar', saveLabel = 'Salvar' }) {
  return (
    <div className="form-actions form-actions--footer">
      <Button type="button" variant="light" className="action-button action-button--secondary" onClick={onBack}>{backLabel}</Button>
      <Button type="button" variant="success" className="action-button action-button--success" onClick={onSave} disabled={saveDisabled}>{saveLabel}</Button>
    </div>
  )
}

function CompanyRegistrationForm({ applicationData, updateField, onBack, onSave, saveDisabled, saveLabel = 'Salvar' }) {
  return (
    <FormSection title="Cadastrar proponente">
      <div className="company-form-group">
        <div className="company-form-group__title">Dados cadastrais</div>
        <Row className="g-3">
          <Col md={6}><Form.Group><Form.Label>Tipo de proponente *</Form.Label><Form.Select value={applicationData.companyType} onChange={updateField('companyType')}><option value="" disabled>Selecionar</option><option>LTDA</option><option>SLU</option><option>S/A</option><option>EIRELI</option><option>OSCIP</option><option>Outro</option></Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>CNPJ *</Form.Label><Form.Control placeholder="00.000.000/0001-00" value={applicationData.cnpj} onChange={updateField('cnpj')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Razão social *</Form.Label><Form.Control placeholder="Nome completo do proponente" value={applicationData.companyName} onChange={updateField('companyName')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Nome fantasia</Form.Label><Form.Control placeholder="Nome de uso comercial" value={applicationData.tradeName} onChange={updateField('tradeName')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>E-mail institucional *</Form.Label><Form.Control type="email" placeholder="email@proponente.org.br" value={applicationData.email} onChange={updateField('email')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Confirmação de e-mail *</Form.Label><Form.Control type="email" placeholder="Repita o e-mail" value={applicationData.emailConfirm} onChange={updateField('emailConfirm')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Telefone principal *</Form.Label><Form.Control placeholder="(DDD) 0 0000-0000" value={applicationData.phone} onChange={updateField('phone')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Telefone secundário</Form.Label><Form.Control placeholder="(DDD) 0 0000-0000" value={applicationData.phoneSecondary} onChange={updateField('phoneSecondary')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Website</Form.Label><Form.Control placeholder="https://www.proponente.org.br" value={applicationData.website} onChange={updateField('website')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Data de criação</Form.Label><Form.Control type="date" value={applicationData.foundationDate} onChange={updateField('foundationDate')} /></Form.Group></Col>
          <Col lg={4}><Form.Group><Form.Label>Capital declarado</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.shareCapital} onChange={updateField('shareCapital')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>CNAE principal *</Form.Label><Form.Select value={applicationData.primaryCnae} onChange={updateField('primaryCnae')}><option value="" disabled>Selecionar CNAE principal</option>{cnaeOptions.map((option) => <option key={option}>{option}</option>)}</Form.Select></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>CNAEs secundários</Form.Label><Form.Select multiple value={applicationData.secondaryCnaes ? applicationData.secondaryCnaes.split(' | ') : []} onChange={(event) => updateField('secondaryCnaes')({ target: { value: Array.from(event.target.selectedOptions).map((option) => option.value).join(' | ') } })}>{cnaeOptions.map((option) => <option key={option}>{option}</option>)}</Form.Select></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group">
        <div className="company-form-group__title">Senha de acesso</div>
        <Row className="g-3">
          <Col md={6}><Form.Group><Form.Label>Senha *</Form.Label><Form.Control type="password" placeholder="Mínimo 8 caracteres" value={applicationData.password} onChange={updateField('password')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Confirmação de senha *</Form.Label><Form.Control type="password" placeholder="Repita a senha" value={applicationData.passwordConfirm} onChange={updateField('passwordConfirm')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group">
        <div className="company-form-group__title">Endereço</div>
        <Row className="g-3">
          <Col md={4}><Form.Group><Form.Label>CEP *</Form.Label><Form.Control placeholder="00.000-000" value={applicationData.zipCode} onChange={updateField('zipCode')} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Número *</Form.Label><Form.Control placeholder="Número" value={applicationData.streetNumber} onChange={updateField('streetNumber')} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Geolocalização (Lat. e Long.)</Form.Label><Form.Control placeholder="Latitude e Longitude" value={applicationData.geoFields} onChange={updateField('geoFields')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Logradouro *</Form.Label><Form.Control placeholder="Av., Rua, etc." value={applicationData.street} onChange={updateField('street')} /></Form.Group></Col>
          <Col xs={12}><Form.Group><Form.Label>Ponto de referência</Form.Label><Form.Control placeholder="Ponto de referência próximo" value={applicationData.landmark} onChange={updateField('landmark')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Bairro *</Form.Label><Form.Control placeholder="Nome do bairro" value={applicationData.neighborhood} onChange={updateField('neighborhood')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Complemento</Form.Label><Form.Control placeholder="Sala, bloco, apto..." value={applicationData.addressComplement} onChange={updateField('addressComplement')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Cidade *</Form.Label><Form.Select value={applicationData.city} onChange={updateField('city')}><option value="" disabled>Selecionar</option><option>Fortaleza</option><option>Caucaia</option><option>Maracanaú</option><option>Outro município</option></Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>UF *</Form.Label><Form.Select value={applicationData.state} onChange={updateField('state')}><option value="" disabled>Selecionar</option><option>CE</option><option>PI</option><option>RN</option><option>PE</option></Form.Select></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Dados bancários</div>
        <Row className="g-3">
          <Col xs={12}><Form.Group><Form.Label>Banco</Form.Label><Form.Select value={applicationData.bank} onChange={updateField('bank')}><option value="" disabled>Selecione um banco</option>{bankOptions.map((option) => <option key={option}>{option}</option>)}</Form.Select></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Agência</Form.Label><Form.Control placeholder="Número da agência" value={applicationData.agency} onChange={updateField('agency')} /></Form.Group></Col>
          <Col md={6}><Form.Group><Form.Label>Conta</Form.Label><Form.Control placeholder="Número da conta" value={applicationData.account} onChange={updateField('account')} /></Form.Group></Col>
        </Row>
      </div>

      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} saveLabel={saveLabel} />
    </FormSection>
  )
}

function LegalContactForm({ applicationData, updateField, onBack, onSave, saveDisabled }) {
  return (
    <FormSection title="Representante legal e contato comercial">
      <div className="company-form-group">
        <div className="company-form-group__title">Responsável legal</div>
        <Row className="g-3">
          <Col lg={6} md={12}><Form.Group><Form.Label>Nome do representante legal *</Form.Label><Form.Control placeholder="Nome completo" value={applicationData.legalRepresentative} onChange={updateField('legalRepresentative')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>CPF do representante *</Form.Label><Form.Control placeholder="000.000.000-00" value={applicationData.legalRepresentativeCpf} onChange={updateField('legalRepresentativeCpf')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>Cargo *</Form.Label><Form.Control placeholder="Diretor, sócio, procurador..." value={applicationData.legalRepresentativeRole} onChange={updateField('legalRepresentativeRole')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Contato comercial</div>
        <Row className="g-3">
          <Col lg={6} md={12}><Form.Group><Form.Label>Nome do contato comercial *</Form.Label><Form.Control placeholder="Nome do responsável pelo contato" value={applicationData.commercialContact} onChange={updateField('commercialContact')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>CPF do contato *</Form.Label><Form.Control placeholder="000.000.000-00" value={applicationData.commercialContactCpf} onChange={updateField('commercialContactCpf')} /></Form.Group></Col>
          <Col lg={3} md={6}><Form.Group><Form.Label>Telefone do contato *</Form.Label><Form.Control placeholder="(85) 99999-9999" value={applicationData.commercialContactPhone} onChange={updateField('commercialContactPhone')} /></Form.Group></Col>
        </Row>
      </div>

      <div className="info-banner mt-4"><i className="bi bi-info-circle" /><span>Esta etapa concentra apenas os dados dos responsáveis do proponente. O restante do cadastro continua nas outras opções da área do proponente.</span></div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function FiscalForm({ applicationData, setUploadStatus, onBack, onSave, saveDisabled }) {
  const fiscalUploads = uploadChecklist.slice(0, 8)
  return (
    <FormSection title="Regularidade fiscal e trabalhista" subtitle="Certidões fiscais e comprovações de regularidade exigidas na fase de inscrição.">
      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Certidões e comprovações</div>
        <div className="upload-grid">
          {fiscalUploads.map((item) => (
            <UploadItemCard
              key={item.key}
              item={item}
              uploadedFileName={applicationData.uploads[item.key]}
              onChange={(fileName) => setUploadStatus(item.key, fileName)}
            />
          ))}
        </div>
      </div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function AttachmentsForm({ applicationData, setUploadStatus, onBack, onSave, saveDisabled }) {
  const attachmentUploads = uploadChecklist.slice(8)
  const declaracaoItem = { key: 'declaracaoAssinada', label: 'Declarações assinadas', info: 'Arquivo PDF contendo as declarações obrigatórias assinadas pelo representante legal do proponente.', reviewStatus: 'under-review' }

  return (
    <FormSection title="Documentos institucionais e anexos" subtitle="Uploads complementares, modelos assinados e comprovantes do proponente.">
      <div className="company-form-group">
        <div className="company-form-group__title">Documentos complementares</div>
        <div className="upload-grid">
          {attachmentUploads.map((item) => (
            <UploadItemCard
              key={item.key}
              item={item}
              uploadedFileName={applicationData.uploads[item.key]}
              onChange={(fileName) => setUploadStatus(item.key, fileName)}
            />
          ))}
        </div>
      </div>

      <div className="company-form-group company-form-group--last">
        <div className="company-form-group__title">Declarações</div>
        <div className="upload-grid">
          <UploadItemCard
            key={declaracaoItem.key}
            item={declaracaoItem}
            uploadedFileName={applicationData.uploads[declaracaoItem.key]}
            onChange={(fileName) => setUploadStatus(declaracaoItem.key, fileName)}
          />
        </div>
      </div>

      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function MarkdownField({ label, field, placeholder, value, updateField }) {
  const textareaRef = useRef(null)

  const setFieldValue = (nextValue) => {
    updateField(field)({ target: { value: nextValue } })
  }

  const applyWrap = (prefix, suffix = '', fallback = '') => {
    const textarea = textareaRef.current
    const currentValue = value || ''

    if (!textarea) {
      setFieldValue(`${currentValue}${currentValue ? '\n' : ''}${prefix}${fallback}${suffix}`)
      return
    }

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const selectedText = currentValue.slice(start, end) || fallback
    const replacement = `${prefix}${selectedText}${suffix}`
    const nextValue = `${currentValue.slice(0, start)}${replacement}${currentValue.slice(end)}`

    setFieldValue(nextValue)

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length)
    })
  }

  const applyLinePrefix = (prefix, fallback = '') => {
    const textarea = textareaRef.current
    const currentValue = value || ''

    if (!textarea) {
      setFieldValue(`${currentValue}${currentValue ? '\n' : ''}${prefix}${fallback}`)
      return
    }

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const blockStart = currentValue.lastIndexOf('\n', Math.max(0, start - 1)) + 1
    const blockEndIndex = currentValue.indexOf('\n', end)
    const blockEnd = blockEndIndex === -1 ? currentValue.length : blockEndIndex
    const selectedBlock = currentValue.slice(blockStart, blockEnd) || fallback
    const replacement = selectedBlock
      .split('\n')
      .map((line) => `${prefix}${line || fallback}`)
      .join('\n')
    const nextValue = `${currentValue.slice(0, blockStart)}${replacement}${currentValue.slice(blockEnd)}`

    setFieldValue(nextValue)

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(blockStart, blockStart + replacement.length)
    })
  }

  const insertBlock = (text) => {
    const textarea = textareaRef.current
    const currentValue = value || ''

    if (!textarea) {
      setFieldValue(`${currentValue}${currentValue ? '\n' : ''}${text}`)
      return
    }

    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const nextValue = `${currentValue.slice(0, start)}${text}${currentValue.slice(end)}`

    setFieldValue(nextValue)

    requestAnimationFrame(() => {
      textarea.focus()
      const caret = start + text.length
      textarea.setSelectionRange(caret, caret)
    })
  }

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <div className="editor-shell">
        <div className="editor-toolbar">
          <button type="button" className="editor-tool editor-tool--icon" aria-label="Desfazer">
            <i className="bi bi-arrow-counterclockwise" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" aria-label="Refazer">
            <i className="bi bi-arrow-clockwise" />
          </button>

          <select className="editor-select" defaultValue="Kanit" aria-label="Selecione uma fonte">
            <option>Kanit</option>
          </select>

          <select className="editor-select editor-select--size" defaultValue="16" aria-label="Tamanho da fonte">
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="22">22</option>
            <option value="28">28</option>
          </select>

          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyWrap('**', '**', 'texto')} aria-label="Negrito">
            <i className="bi bi-type-bold" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyWrap('*', '*', 'texto')} aria-label="Italico">
            <i className="bi bi-type-italic" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyWrap('<u>', '</u>', 'texto')} aria-label="Sublinhado">
            <i className="bi bi-type-underline" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyWrap('~~', '~~', 'texto')} aria-label="Tachado">
            <i className="bi bi-type-strikethrough" />
          </button>

          <button type="button" className="editor-tool editor-tool--color" aria-label="Cor do texto">
            <span className="editor-color-swatch" />
            <i className="bi bi-caret-down-fill" />
          </button>

          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyLinePrefix('- ', 'item')} aria-label="Lista">
            <i className="bi bi-list-ul" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyLinePrefix('1. ', 'item')} aria-label="Lista numerada">
            <i className="bi bi-list-ol" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyLinePrefix('## ', 'Subtitulo')} aria-label="Titulo">
            <i className="bi bi-text-paragraph" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => applyLinePrefix('> ', 'citacao')} aria-label="Citacao">
            <i className="bi bi-text-indent-left" />
          </button>
          <button type="button" className="editor-tool editor-tool--icon" onClick={() => insertBlock('\n---\n')} aria-label="Separador">
            <i className="bi bi-layout-text-sidebar-reverse" />
          </button>
        </div>

        <Form.Control
          ref={textareaRef}
          as="textarea"
          rows={9}
          className="editor-textarea"
          placeholder={placeholder}
          value={value}
          onChange={updateField(field)}
        />
      </div>
      <small className="markdown-helper">
        Campo com edicao assistida e suporte a Markdown.
      </small>
    </Form.Group>
  )
}

function ProjectForm({ applicationData, updateField, setUploadStatus, onBack, onSave, saveDisabled }) {
  return (
    <FormSection title="Projeto, plano de trabalho e mídia" subtitle="Campos ligados ao evento ou projeto que será analisado pela comissão.">
      <div className="company-form-group">
        <div className="company-form-group__title">Selecione um edital</div>
        <Row className="g-3">
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Edital *</Form.Label>
              <Form.Select value={applicationData.selectedNotice} onChange={updateField('selectedNotice')}>
                <option value="" disabled>Selecione um edital</option>
                {noticeOptions.map((option) => <option key={option}>{option}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {applicationData.selectedNotice && (
        <div className="company-form-group company-form-group--last">
          <div className="company-form-group__title">Dados do projeto</div>
          <Row className="g-3">
            <Col lg={8}><Form.Group><Form.Label>Titulo do projeto *</Form.Label><Form.Control placeholder="Nome do evento ou projeto" value={applicationData.projectTitle} onChange={updateField('projectTitle')} /></Form.Group></Col>
            <Col lg={4}><Form.Group><Form.Label>PDF do projeto *</Form.Label><Form.Control key={applicationData.uploads.projectPdf || 'project-pdf-empty'} type="file" onChange={(event) => setUploadStatus('projectPdf', event.target.files?.[0]?.name || '')} /></Form.Group></Col>
            {applicationData.uploads.projectPdf && (
              <Col xs={12}>
                <div className="project-upload-info">
                  <small>{applicationData.uploads.projectPdf}</small>
                  <button type="button" className="upload-remove-button" onClick={() => setUploadStatus('projectPdf', '')}>Remover anexo</button>
                </div>
              </Col>
            )}
            <Col lg={6} md={6}><Form.Group><Form.Label>Valor solicitado *</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.projectAmount} onChange={updateField('projectAmount')} /></Form.Group></Col>
            <Col lg={6} md={6}><Form.Group><Form.Label>Contrapartida proposta *</Form.Label><Form.Control placeholder="R$ 0,00" value={applicationData.projectCounterpart} onChange={updateField('projectCounterpart')} /></Form.Group></Col>
          </Row>
        </div>
      )}

      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function DeclarationsForm({ applicationData, setDeclarationValue, onBack, onSave, saveDisabled }) {
  const companyName = applicationData.companyName || '[RAZÃO SOCIAL]'
  const cnpj = applicationData.cnpj || '[?]'
  const representativeName = applicationData.legalRepresentative || '[NOME]'
  const representativeCpf = applicationData.legalRepresentativeCpf || '[?]'
  const declarationItems = []

  if (applicationData.declarations.socialRegularity) {
    declarationItems.push('O proponente atende aos requisitos de regularidade trabalhista e social previstos no edital;')
  }

  if (applicationData.declarations.articleSeven) {
    declarationItems.push('Não emprega menor de 18 (dezoito) anos em trabalho noturno, perigoso ou insalubre;')
    declarationItems.push('Não emprega menor de 16 (dezesseis) anos;')
    declarationItems.push('Emprega menor, a partir de 14 (quatorze) anos, apenas na condição de aprendiz, quando aplicável;')
  }

  if (applicationData.declarations.noticeAgreement) {
    declarationItems.push('Leu o edital, os anexos e concorda com as condições de participação no presente processo seletivo;')
  }

  return (
    <FormSection title="Declarações obrigatórias e revisão" subtitle="Termos de ciência e declarações necessárias para a conclusão da inscrição.">
      <div className="company-form-group">
        <div className="company-form-group__title">Confirmações obrigatórias</div>
        <div className="declaration-list">
          <Form.Check type="checkbox" id="social-regularity" checked={applicationData.declarations.socialRegularity} onChange={(event) => setDeclarationValue('socialRegularity', event.target.checked)} label="Declaro que o proponente atende aos requisitos de regularidade trabalhista e social previstos no edital." />
          <Form.Check type="checkbox" id="art-7" checked={applicationData.declarations.articleSeven} onChange={(event) => setDeclarationValue('articleSeven', event.target.checked)} label="Declaro cumprimento do inciso XXXIII do art. 7º da Constituição Federal." />
          <Form.Check type="checkbox" id="notice-agreement" checked={applicationData.declarations.noticeAgreement} onChange={(event) => setDeclarationValue('noticeAgreement', event.target.checked)} label="Declaro que li o edital, os anexos e concordo com as condições da seleção." />
        </div>
      </div>

      <div className="company-form-group company-form-group--last declaration-preview">
        <div className="company-form-group__title">Declaração gerada</div>

        {declarationItems.length > 0 ? (
          <div className="declaration-document">
            <p className="declaration-document__title">
              DECLARAÇÃO DE CUMPRIMENTO DO INCISO XXXIII DO ART. 7º DA CONSTITUIÇÃO FEDERAL
            </p>
            <p>
              O proponente <strong>{companyName}</strong>, inscrita no CNPJ no <strong>{cnpj}</strong>, por
              intermedio de seu representante legal, Sr.(a) <strong>{representativeName}</strong>,
              portador(a) da Carteira de Identidade no <strong>[?]</strong> e do CPF no{' '}
              <strong>{representativeCpf}</strong>, DECLARA, para fins de participacao no presente
              processo seletivo, que:
            </p>

            <div className="declaration-document__items">
              {declarationItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <p>
              Declara, ainda, estar ciente de que a falsidade da presente declaração sujeitará
              o proponente às sanções previstas em lei, inclusive quanto à inabilitação no processo
              seletivo e demais penalidades cabíveis.
            </p>

            <p>Local e data. Nome e assinatura do representante legal.</p>
          </div>
        ) : (
          <p className="summary-empty">
            Marque as declarações obrigatórias para montar automaticamente o texto final com os
            dados do proponente e do representante legal.
          </p>
        )}
      </div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

function SettingsForm({ preferences, setPreferences, onBack, onSave, saveDisabled }) {
  const updatePreference = (field) => (event) => {
    setPreferences((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  return (
    <FormSection title="Configurações visuais" subtitle="Aplicação da tipografia Kanit, tema claro ou escuro e paletas acessíveis.">
      <div className="settings-stack">
        <div className="company-form-group">
          <div className="company-form-group__title">Modo de aparência</div>
          <div className="settings-options">
            <label className={`settings-option${preferences.themeMode === 'light' ? ' is-selected' : ''}`}>
              <input type="radio" name="themeMode" value="light" checked={preferences.themeMode === 'light'} onChange={updatePreference('themeMode')} />
              <div>
                <strong>Modo claro</strong>
                <span>Usa a paleta clara do arquivo de tokens.</span>
              </div>
            </label>
            <label className={`settings-option${preferences.themeMode === 'dark' ? ' is-selected' : ''}`}>
              <input type="radio" name="themeMode" value="dark" checked={preferences.themeMode === 'dark'} onChange={updatePreference('themeMode')} />
              <div>
                <strong>Modo escuro</strong>
                <span>Usa a paleta escura com contraste reforçado.</span>
              </div>
            </label>
          </div>
        </div>

        <div className="company-form-group company-form-group--last">
          <div className="company-form-group__title">Paleta acessível</div>
          <Form.Select value={preferences.visionMode} onChange={updatePreference('visionMode')}>
            <option value="default">Padrão</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="protanopia">Protanopia</option>
            <option value="tritanopia">Tritanopia</option>
          </Form.Select>
          <p className="settings-helper">
            As cores principais, de status e de destaque seguem as variações acessíveis presentes nos tokens.
          </p>
        </div>
      </div>
      <StageFooterActions onBack={onBack} onSave={onSave} saveDisabled={saveDisabled} />
    </FormSection>
  )
}

export function StageFormScreen({ currentStage, applicationData, setApplicationData, progressItems, completedSteps, activeStep, preferences, setPreferences, onBack, onSaveStage, onExit, onGoToSettings, portalView, onSelectPortal, registerAudit, isOnboarding = false, onOpenSidebar }) {
  const content = stageContent[currentStage] || stageContent['company-registration']
  const isEditing = !isOnboarding

  const updateField = (field) => (event) => {
    const value = event?.target?.value ?? event
    setApplicationData((current) => ({ ...current, [field]: value }))
  }

  const setUploadStatus = (field, fileName) => {
    setApplicationData((current) => ({
      ...current,
      uploads: { ...current.uploads, [field]: fileName },
    }))
  }

  const setDeclarationValue = (field, value) => {
    setApplicationData((current) => ({
      ...current,
      declarations: { ...current.declarations, [field]: value },
    }))
  }

  const handleSave = () => {
    registerAudit?.('Etapa salva', content.title)
    onSaveStage?.()
  }

  const renderStage = () => {
    switch (currentStage) {
      case 'company-registration':
        return <CompanyRegistrationForm applicationData={applicationData} updateField={updateField} onBack={onBack} onSave={handleSave} saveDisabled={false} saveLabel={isOnboarding ? 'Entrar no painel' : 'Salvar'} />
      case 'legal-contact':
        return <LegalContactForm applicationData={applicationData} updateField={updateField} onBack={onBack} onSave={handleSave} saveDisabled={false} />
      case 'fiscal':
        return <FiscalForm applicationData={applicationData} setUploadStatus={setUploadStatus} onBack={onBack} onSave={handleSave} saveDisabled={false} />
      case 'attachments':
      case 'declarations':
        return <AttachmentsForm applicationData={applicationData} setUploadStatus={setUploadStatus} onBack={onBack} onSave={handleSave} saveDisabled={false} />
      case 'project':
        return <ProjectForm applicationData={applicationData} updateField={updateField} setUploadStatus={setUploadStatus} onBack={onBack} onSave={handleSave} saveDisabled={false} />
      case 'settings':
        return <SettingsForm preferences={preferences} setPreferences={setPreferences} onBack={onBack} onSave={handleSave} saveDisabled={false} />
      case 'appeal':
        return (
          <FormSection title="Recurso do resultado">
            <div className="company-form-group company-form-group--last">
              <div className="company-form-group__title">Recurso</div>
              <p className="summary-empty">Quando o edital abrir a fase recursal, esta tela podera receber a fundamentacao e os anexos do recurso.</p>
            </div>
            <StageFooterActions onBack={onBack} onSave={handleSave} saveDisabled saveLabel="Indisponivel" />
          </FormSection>
        )
      default:
        return null
    }
  }

  const showSidebar = !isOnboarding || currentStage === 'company-registration'

  return (
    <div className="candidate-dashboard registration-flow">
      <PainelNavbar onExit={onExit} onGoToSettings={() => onGoToSettings?.()} portalView={portalView} onSelectPortal={onSelectPortal} onOpenSidebar={onOpenSidebar} />
      <main className="candidate-content registration-flow__content">
        <Container fluid className="px-0">
          <section className="page-intro page-intro--company">
            <div>
              <p className="eyebrow">{content.eyebrow}</p>
              <h2>{content.title}</h2>
              <p>{content.description}</p>
            </div>
          </section>
          <Row className="g-4 align-items-start">
            <Col xl={9}><div className="form-stack">{renderStage()}</div></Col>
            {showSidebar && <Col xl={3}>
              <div className="sidebar-column">
                <SidebarStatus applicationData={applicationData} progressItems={progressItems} completedSteps={completedSteps} activeStep={activeStep} isEditing={isEditing} />
              </div>
            </Col>}
          </Row>
        </Container>
      </main>
      <AppFooter />
    </div>
  )
}
